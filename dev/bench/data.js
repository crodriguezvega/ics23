window.BENCHMARK_DATA = {
  "lastUpdate": 1681414566032,
  "repoUrl": "https://github.com/crodriguezvega/ics23",
  "entries": {
    "Go Benchmark": [
      {
        "commit": {
          "author": {
            "email": "carlos@interchain.io",
            "name": "Carlos Rodriguez",
            "username": "crodriguezvega"
          },
          "committer": {
            "email": "carlos@interchain.io",
            "name": "Carlos Rodriguez",
            "username": "crodriguezvega"
          },
          "distinct": true,
          "id": "a3a5f613af7155072dc1a8c4bc707e1ef92fd640",
          "message": "another attempt",
          "timestamp": "2023-04-09T09:42:02+02:00",
          "tree_id": "92c7e381786b49d3eadeeadb8990d32187d6e583",
          "url": "https://github.com/crodriguezvega/ics23/commit/a3a5f613af7155072dc1a8c4bc707e1ef92fd640"
        },
        "date": 1681026268194,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkVerification/memdb-10000-16-40/verify-membership",
            "value": 13591,
            "unit": "ns/op\t    5760 B/op\t     115 allocs/op",
            "extra": "85624 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-10000-16-40/verify-non-membership",
            "value": 26491,
            "unit": "ns/op\t   10800 B/op\t     215 allocs/op",
            "extra": "41304 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-100000-16-40/verify-membership",
            "value": 18103,
            "unit": "ns/op\t    6792 B/op\t     135 allocs/op",
            "extra": "71354 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-100000-16-40/verify-non-membership",
            "value": 36327,
            "unit": "ns/op\t   13536 B/op\t     269 allocs/op",
            "extra": "32563 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-16-40/verify-membership",
            "value": 19425,
            "unit": "ns/op\t    8376 B/op\t     166 allocs/op",
            "extra": "63680 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-16-40/verify-non-membership",
            "value": 39790,
            "unit": "ns/op\t   16681 B/op\t     330 allocs/op",
            "extra": "32000 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-32-80/verify-membership",
            "value": 21231,
            "unit": "ns/op\t    9032 B/op\t     177 allocs/op",
            "extra": "55130 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-32-80/verify-non-membership",
            "value": 38806,
            "unit": "ns/op\t   16576 B/op\t     325 allocs/op",
            "extra": "29710 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-64-160/verify-membership",
            "value": 20408,
            "unit": "ns/op\t    9040 B/op\t     175 allocs/op",
            "extra": "58192 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-64-160/verify-non-membership",
            "value": 36939,
            "unit": "ns/op\t   16208 B/op\t     313 allocs/op",
            "extra": "31052 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "crodriguezvega",
            "username": "crodriguezvega"
          },
          "committer": {
            "name": "crodriguezvega",
            "username": "crodriguezvega"
          },
          "id": "e968a1e6ee92633b63f610c8bacc151b5a13752e",
          "message": "simulate performance degradation",
          "timestamp": "2023-04-08T19:04:22Z",
          "url": "https://github.com/crodriguezvega/ics23/pull/1/commits/e968a1e6ee92633b63f610c8bacc151b5a13752e"
        },
        "date": 1681067193457,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkVerification/memdb-10000-16-40/verify-membership",
            "value": 13347192,
            "unit": "ns/op\t    6520 B/op\t     131 allocs/op",
            "extra": "85 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-10000-16-40/verify-non-membership",
            "value": 35850,
            "unit": "ns/op\t   11424 B/op\t     228 allocs/op",
            "extra": "32806 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-100000-16-40/verify-membership",
            "value": 13161024,
            "unit": "ns/op\t    7371 B/op\t     147 allocs/op",
            "extra": "82 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-100000-16-40/verify-non-membership",
            "value": 51280,
            "unit": "ns/op\t   14352 B/op\t     285 allocs/op",
            "extra": "23188 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-16-40/verify-membership",
            "value": 13888589,
            "unit": "ns/op\t    8089 B/op\t     161 allocs/op",
            "extra": "86 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-16-40/verify-non-membership",
            "value": 54333,
            "unit": "ns/op\t   17712 B/op\t     351 allocs/op",
            "extra": "21423 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-32-80/verify-membership",
            "value": 13921491,
            "unit": "ns/op\t    8224 B/op\t     162 allocs/op",
            "extra": "81 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-32-80/verify-non-membership",
            "value": 57322,
            "unit": "ns/op\t   17944 B/op\t     352 allocs/op",
            "extra": "22506 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-64-160/verify-membership",
            "value": 14023431,
            "unit": "ns/op\t    9059 B/op\t     176 allocs/op",
            "extra": "85 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-64-160/verify-non-membership",
            "value": 59108,
            "unit": "ns/op\t   18176 B/op\t     351 allocs/op",
            "extra": "20821 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "carlos@interchain.io",
            "name": "Carlos Rodriguez",
            "username": "crodriguezvega"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8ff01b74e88c64e9ca8e46f82b3597722258508a",
          "message": "Merge branch 'cosmos:master' into master",
          "timestamp": "2023-04-13T21:33:04+02:00",
          "tree_id": "7867c6ed0416660efff70c06f49df172b10e0946",
          "url": "https://github.com/crodriguezvega/ics23/commit/8ff01b74e88c64e9ca8e46f82b3597722258508a"
        },
        "date": 1681414564620,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkVerification/memdb-10000-16-40/verify-membership",
            "value": 21118,
            "unit": "ns/op\t    6792 B/op\t     135 allocs/op",
            "extra": "55422 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-10000-16-40/verify-non-membership",
            "value": 41187,
            "unit": "ns/op\t   12624 B/op\t     251 allocs/op",
            "extra": "33486 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-100000-16-40/verify-membership",
            "value": 23903,
            "unit": "ns/op\t    7104 B/op\t     141 allocs/op",
            "extra": "50100 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-100000-16-40/verify-non-membership",
            "value": 48045,
            "unit": "ns/op\t   14208 B/op\t     282 allocs/op",
            "extra": "22158 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-16-40/verify-membership",
            "value": 26416,
            "unit": "ns/op\t    8184 B/op\t     162 allocs/op",
            "extra": "50382 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-16-40/verify-non-membership",
            "value": 55003,
            "unit": "ns/op\t   17544 B/op\t     347 allocs/op",
            "extra": "24020 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-32-80/verify-membership",
            "value": 24450,
            "unit": "ns/op\t    7952 B/op\t     156 allocs/op",
            "extra": "46656 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-32-80/verify-non-membership",
            "value": 51935,
            "unit": "ns/op\t   16120 B/op\t     316 allocs/op",
            "extra": "23384 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-64-160/verify-membership",
            "value": 25498,
            "unit": "ns/op\t    8488 B/op\t     164 allocs/op",
            "extra": "42902 times\n2 procs"
          },
          {
            "name": "BenchmarkVerification/memdb-1000000-64-160/verify-non-membership",
            "value": 50150,
            "unit": "ns/op\t   16112 B/op\t     311 allocs/op",
            "extra": "21909 times\n2 procs"
          }
        ]
      }
    ]
  }
}