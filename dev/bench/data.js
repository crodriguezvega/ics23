window.BENCHMARK_DATA = {
  "lastUpdate": 1681026268748,
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
      }
    ]
  }
}