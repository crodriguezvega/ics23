package benchmarks

import (
	"fmt"
	"math/rand"
	"os"
	"runtime"
	"strings"
	"testing"

	"github.com/stretchr/testify/require"

	db "github.com/cosmos/cosmos-db"
	"github.com/cosmos/iavl"

	ics23 "github.com/cosmos/ics23/go"
)

const historySize = 20

type KeyValuePair struct {
	Key, Value []byte
}

func randBytes(length int) []byte {
	key := make([]byte, length)
	// math.rand.Read always returns err=nil
	// we do not need cryptographic randomness for this test:
	rand.Read(key)
	return key
}

func prepareTree(b *testing.B, db db.DB, size, keyLen, dataLen int) (*iavl.MutableTree, []KeyValuePair) {
	t, err := iavl.NewMutableTreeWithOpts(db, size, nil, false)
	require.NoError(b, err)

	var (
		key           []byte
		value         []byte
		keyValuePairs []KeyValuePair
	)

	for i := 0; i < size; i++ {
		key = randBytes(keyLen)
		value = randBytes(dataLen)
		_, err = t.Set(key, value)
		require.NoError(b, err)

		keyValuePairs = append(keyValuePairs, KeyValuePair{key, value})
	}

	commitTree(b, t)
	runtime.GC()
	return t, keyValuePairs
}

// commit tree saves a new version and deletes old ones according to historySize
func commitTree(b *testing.B, t *iavl.MutableTree) {
	_, err := t.Hash()
	require.NoError(b, err)

	_, version, err := t.SaveVersion()
	if err != nil {
		b.Errorf("Can't save: %v", err)
	}

	if version > historySize {
		err = t.DeleteVersionsTo(version - historySize)
		if err != nil {
			b.Errorf("Can't delete: %v", err)
		}
	}
}

// runVerifyMembership
func runVerifyMembership(b *testing.B, t *iavl.MutableTree, key, value []byte) {
	rootHash, _, err := t.SaveVersion()
	require.NoError(b, err)

	proof, err := t.GetMembershipProof(key)
	require.NoError(b, err)

	for i := 0; i < b.N; i++ {
		contains := ics23.VerifyMembership(ics23.IavlSpec, rootHash, proof, key, value)
		require.True(b, contains)
	}
}

func runVerifyNonMembership(b *testing.B, t *iavl.MutableTree, key []byte) {
	rootHash, _, err := t.SaveVersion()
	require.NoError(b, err)

	proof, err := t.GetNonMembershipProof(key)
	require.NoError(b, err)

	for i := 0; i < b.N; i++ {
		notContains := ics23.VerifyNonMembership(ics23.IavlSpec, rootHash, proof, key)
		require.True(b, notContains)
	}
}

type benchmark struct {
	dbType          db.BackendType
	initSize        int
	keyLen, dataLen int
}

func BenchmarkVerification(b *testing.B) {
	benchmarks := []benchmark{
		{"memdb", 10000, 16, 40},
		{"memdb", 100000, 16, 40},
		{"memdb", 1000000, 16, 40},
		{"memdb", 1000000, 32, 80},
		{"memdb", 1000000, 64, 160},
	}
	runBenchmarks(b, benchmarks)
}

func runBenchmarks(b *testing.B, benchmarks []benchmark) {
	fmt.Printf("%s\n", iavl.GetVersionInfo())
	for _, bb := range benchmarks {
		bb := bb
		prefix := fmt.Sprintf("%s-%d-%d-%d", bb.dbType,
			bb.initSize, bb.keyLen, bb.dataLen)

		// prepare a dir for the db and cleanup afterwards
		dirName := fmt.Sprintf("./%s-db", prefix)
		if bb.dbType == db.RocksDBBackend {
			_ = os.Mkdir(dirName, 0o755)
		}

		defer func() {
			err := os.RemoveAll(dirName)
			if err != nil {
				b.Errorf("%+v\n", err)
			}
		}()

		// note that "" leads to nil backing db!
		var (
			d   db.DB
			err error
		)
		if bb.dbType != "nodb" {
			d, err = db.NewDB("test", bb.dbType, dirName)

			if err != nil {
				if strings.Contains(err.Error(), "unknown db_backend") {
					// As an exception to run benchmarks: if the error is about cleveldb, or rocksdb,
					// it requires a tag "cleveldb" to link the database at runtime, so instead just
					// log the error instead of failing.
					b.Logf("%+v\n", err)
					continue
				} else {
					require.NoError(b, err)
				}
			}
			defer d.Close()
		}
		b.Run(prefix, func(sub *testing.B) {
			runSuite(sub, d, bb.initSize, bb.keyLen, bb.dataLen)
		})
	}
}

// returns number of MB in use
func memUseMB() float64 {
	var mem runtime.MemStats
	runtime.ReadMemStats(&mem)
	asize := mem.Alloc
	mb := float64(asize) / 1000000
	return mb
}

func runSuite(b *testing.B, d db.DB, initSize, keyLen, dataLen int) {
	// measure mem usage
	runtime.GC()
	init := memUseMB()

	t, keyValuePairs := prepareTree(b, d, initSize, keyLen, dataLen)
	used := memUseMB() - init
	fmt.Printf("Init Tree took %0.2f MB\n", used)

	b.ResetTimer()

	b.Run("verify-membership", func(sub *testing.B) {
		sub.ReportAllocs()

		// pick a key/value to verify membership for
		kv := keyValuePairs[len(keyValuePairs)/2]

		runVerifyMembership(sub, t, kv.Key, kv.Value)
	})

	b.Run("verify-non-membership", func(sub *testing.B) {
		sub.ReportAllocs()

		// generate a random key
		key := randBytes(keyLen)

		runVerifyNonMembership(sub, t, key)
	})
}
