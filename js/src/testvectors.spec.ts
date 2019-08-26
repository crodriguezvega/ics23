import { readFileSync } from "fs";

import { ics23 } from "./generated/codecimpl";
import { fromHex } from "./helpers";
import {
  batchVerifyMembership,
  batchVerifyNonMembership,
  verifyMembership,
  verifyNonMembership
} from "./ics23";
import { IavlSpec, TendermintSpec } from "./proofs";

describe("calculateExistenceRoot", () => {
  interface RefData {
    readonly root: Uint8Array;
    readonly key: Uint8Array;
    readonly value?: Uint8Array;
  }

  interface LoadResult {
    readonly proof: ics23.ICommitmentProof;
    readonly data: RefData;
  }

  function loadFile(filepath: string): LoadResult {
    const content = readFileSync(filepath).toString();
    const { root, proof, key, value } = JSON.parse(content);
    expect(proof).toBeDefined();
    expect(root).toBeDefined();
    expect(key).toBeDefined();

    const commit = ics23.CommitmentProof.decode(fromHex(proof));

    const data = {
      root: fromHex(root),
      key: fromHex(key),
      value: value ? fromHex(value) : undefined
    };

    return { proof: commit, data };
  }

  interface BatchResult {
    readonly proof: ics23.ICommitmentProof;
    readonly data: ReadonlyArray<RefData>;
  }

  function validateTestVector(filepath: string, spec: ics23.IProofSpec): void {
    const {
      proof,
      data: { root, key, value }
    } = loadFile(filepath);
    if (value) {
      const valid = verifyMembership(proof, spec, root, key, value);
      expect(valid).toBe(true);
    } else {
      const valid = verifyNonMembership(proof, spec, root, key);
      expect(valid).toBe(true);
    }
  }

  it("should parse iavl left", () => {
    validateTestVector("../testdata/iavl/exist_left.json", IavlSpec);
  });
  it("should parse iavl right", () => {
    validateTestVector("../testdata/iavl/exist_right.json", IavlSpec);
  });
  it("should parse iavl middle", () => {
    validateTestVector("../testdata/iavl/exist_middle.json", IavlSpec);
  });
  it("should parse iavl left - nonexist", () => {
    validateTestVector("../testdata/iavl/nonexist_left.json", IavlSpec);
  });
  it("should parse iavl right - nonexist", () => {
    validateTestVector("../testdata/iavl/nonexist_right.json", IavlSpec);
  });
  it("should parse iavl middle - nonexist", () => {
    validateTestVector("../testdata/iavl/nonexist_middle.json", IavlSpec);
  });

  it("should parse tendermint left", () => {
    validateTestVector(
      "../testdata/tendermint/exist_left.json",
      TendermintSpec
    );
  });
  it("should parse tendermint right", () => {
    validateTestVector(
      "../testdata/tendermint/exist_right.json",
      TendermintSpec
    );
  });
  it("should parse tendermint middle", () => {
    validateTestVector(
      "../testdata/tendermint/exist_middle.json",
      TendermintSpec
    );
  });
  it("should parse tendermint left - nonexist", () => {
    validateTestVector(
      "../testdata/tendermint/nonexist_left.json",
      TendermintSpec
    );
  });
  it("should parse tendermint right - nonexist", () => {
    validateTestVector(
      "../testdata/tendermint/nonexist_right.json",
      TendermintSpec
    );
  });
  it("should parse tendermint middle - nonexist", () => {
    validateTestVector(
      "../testdata/tendermint/nonexist_middle.json",
      TendermintSpec
    );
  });

  function loadBatch(files: ReadonlyArray<string>): BatchResult {
    let refs: ReadonlyArray<RefData> = [];
    let entries: ReadonlyArray<ics23.IBatchEntry> = [];

    for (const file of files) {
      const { proof, data } = loadFile(file);
      refs = [...refs, data];
      if (!!proof.exist) {
        entries = [...entries, { exist: proof.exist }];
      } else if (!!proof.nonexist) {
        entries = [...entries, { nonexist: proof.nonexist }];
      }
    }
    const commit: ics23.ICommitmentProof = {
      batch: {
        // tslint:disable-next-line:readonly-array
        entries: entries as ics23.IBatchEntry[]
      }
    };

    return {
      proof: commit,
      data: refs
    };
  }

  function validateBatch(
    proof: ics23.ICommitmentProof,
    spec: ics23.IProofSpec,
    data: RefData
  ): void {
    const { root, key, value } = data;
    if (value) {
      let valid = verifyMembership(proof, spec, root, key, value);
      expect(valid).toBe(true);
      const items = new Map([[key, value]]);
      valid = batchVerifyMembership(proof, spec, root, items);
      expect(valid).toBe(true);
    } else {
      let valid = verifyNonMembership(proof, spec, root, key);
      expect(valid).toBe(true);
      const keys: ReadonlyArray<Uint8Array> = [key];
      valid = batchVerifyNonMembership(proof, spec, root, keys);
      expect(valid).toBe(true);
    }
  }

  it("should validate iavl batch exist", () => {
    const { proof, data } = loadBatch([
      "../testdata/iavl/exist_left.json",
      "../testdata/iavl/exist_right.json",
      "../testdata/iavl/exist_middle.json",
      "../testdata/iavl/nonexist_left.json",
      "../testdata/iavl/nonexist_right.json",
      "../testdata/iavl/nonexist_middle.json"
    ]);
    validateBatch(proof, IavlSpec, data[0]);
  });

  it("should validate iavl batch nonexist", () => {
    const { proof, data } = loadBatch([
      "../testdata/iavl/exist_left.json",
      "../testdata/iavl/exist_right.json",
      "../testdata/iavl/exist_middle.json",
      "../testdata/iavl/nonexist_left.json",
      "../testdata/iavl/nonexist_right.json",
      "../testdata/iavl/nonexist_middle.json"
    ]);
    validateBatch(proof, IavlSpec, data[5]);
  });

  it("should validate tendermint batch exist", () => {
    const { proof, data } = loadBatch([
      "../testdata/tendermint/exist_left.json",
      "../testdata/tendermint/exist_right.json",
      "../testdata/tendermint/exist_middle.json",
      "../testdata/tendermint/nonexist_left.json",
      "../testdata/tendermint/nonexist_right.json",
      "../testdata/tendermint/nonexist_middle.json"
    ]);
    validateBatch(proof, TendermintSpec, data[2]);
  });

  it("should validate tendermint batch nonexist", () => {
    const { proof, data } = loadBatch([
      "../testdata/tendermint/exist_left.json",
      "../testdata/tendermint/exist_right.json",
      "../testdata/tendermint/exist_middle.json",
      "../testdata/tendermint/nonexist_left.json",
      "../testdata/tendermint/nonexist_right.json",
      "../testdata/tendermint/nonexist_middle.json"
    ]);
    validateBatch(proof, TendermintSpec, data[3]);
  });
});
