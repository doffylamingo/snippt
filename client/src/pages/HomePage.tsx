import { useLoaderData } from "react-router";
import { Feed } from "@/components/Feed";
import type { Recommendations } from "@/types";

export default function HomePage() {
  // const [recommendations, setRecommendations] = useState<Recommendations[]>([
  //   {
  //     track: {
  //       id: "41RdNk7VOequK64nfSix67",
  //       name: "Dapithapon",
  //       duration_ms: 253488,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/953114cc1b04fc6ca17e8402b1cfd4f98856c8f5?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "2zFBNsALb4M2FhKl98wcvd",
  //       name: "Johnoy Danao",
  //       genres: ["opm", "pinoy indie", "kundiman", "harana"],
  //       followers: "111.7K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb3d6c1b76b59c0749fd6e0392",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b273f86734b0ea04376fc724a1fd",
  //       id: "7aLnwr1Jr5xfdmmKKTeBZN",
  //       name: "Dapithapon",
  //       release_date: "2010-12-08",
  //       total_tracks: 12,
  //       type: "ALBUM",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "1rznIP1bYsOGy9D9KyXueZ",
  //       name: "Paraluman",
  //       duration_ms: 281447,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/cf69323efa617a6268cb7bab83c96f6fcbc47e9a?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "4N9XMzF4fPBDnbYVniN6Tp",
  //       name: "Kyle Raphael",
  //       genres: ["opm", "harana", "pinoy indie", "kundiman"],
  //       followers: "55.3K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb5b7e1ca8e10adb258e6ea7cc",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b273927e8bdc51135190e4fa4c6e",
  //       id: "7CoTVzxzcWEB01I4uKe8Wa",
  //       name: "Paraluman",
  //       release_date: "2021-02-19",
  //       total_tracks: 1,
  //       type: "SINGLE",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "5JgpiSDlC4hZ1gS1s8B1cZ",
  //       name: "Kung Loloobin",
  //       duration_ms: 214517,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/be84eebe3973fa427150f0328956f76c87f04443?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "0sJGdZXFIeLEvvAiiWvxc1",
  //       name: "Andrej Agas",
  //       genres: ["pinoy indie", "opm", "harana", "kundiman"],
  //       followers: "6.3K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5ebb2a71997bc89b86f32995f9d",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b27349c6d3899d277ecf7495c36c",
  //       id: "6MUHweRXOjhDFRlmIJNzi5",
  //       name: "Kung Loloobin",
  //       release_date: "2025-05-30",
  //       total_tracks: 1,
  //       type: "SINGLE",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "18ogtQoqULXr4eVNwsXlcy",
  //       name: "Moving Closer",
  //       duration_ms: 188386,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/e834ef57d90b96aa8ea8ed5887b90348f9cb0e5e?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "7n1YRMg8XHJMr4S5Z8zl6d",
  //       name: "Never The Strangers",
  //       genres: ["opm", "pinoy indie", "pinoy alternative", "pinoy rock"],
  //       followers: "80.0K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb03c309d47601a88abf086be9",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b273688e408139a1d3c922277656",
  //       id: "1WJC65SMUhiVGMmuMlOdT9",
  //       name: "Never The Strangers",
  //       release_date: "2012-03-31",
  //       total_tracks: 11,
  //       type: "ALBUM",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "0EFa7HXaZUAzu9q1UdVPBR",
  //       name: "Nahuhulog Na Sa'yo",
  //       duration_ms: 217037,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/55fd4ffbc655622339b0fcc277d17bf706cf096b?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "3XGlotxI2yAE3RV0DX6oD2",
  //       name: "Noah Alejandre",
  //       genres: ["opm", "harana", "pinoy indie", "kundiman"],
  //       followers: "71.2K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb55ae810fa7a3f923a186d2dd",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b273eebb9f327af7bcfb4cb98d36",
  //       id: "3QPcdcXJZ4uophss504wCg",
  //       name: "Nahuhulog Na Sa'yo",
  //       release_date: "2022-12-02",
  //       total_tracks: 1,
  //       type: "SINGLE",
  //     },
  //     liked: true,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "22Nd3GuO7sHopPjdKccRcq",
  //       name: "An Art Gallery Could Never Be As Unique As You",
  //       duration_ms: 158677,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/1584d38849df7ee5d49b27f267f351057196eb7c?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "31fsDbpNPKe346urriO4ma",
  //       name: "mrld",
  //       genres: ["opm", "harana", "kundiman", "pinoy indie", "p-pop"],
  //       followers: "952.0K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5ebb6a6cc19b45b6f874243f56b",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b27323f9a7469fb98e80e4ffdf42",
  //       id: "0FRaoawfqep3bJcCqcQZpD",
  //       name: "An Art Gallery Could Never Be As Unique As You",
  //       release_date: "2019-12-11",
  //       total_tracks: 1,
  //       type: "SINGLE",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "118oTHT9J7qwNuStmFDglU",
  //       name: "Nang Tahimik - Lullaby Version",
  //       duration_ms: 344153,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/555b07216b1c1645a1c65f111ab84d210e6dcdf8?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "6buyTec2V7K6LVmL74MLl2",
  //       name: "geiko",
  //       genres: ["opm", "pinoy indie", "harana", "kundiman"],
  //       followers: "94.3K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5ebe5da3b093550479075fdfcab",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b2732e48dd9fdf03be9fbd9bd323",
  //       id: "3KQOoj1Sgq9dV34d1TEzdD",
  //       name: "Quietly",
  //       release_date: "2025-02-14",
  //       total_tracks: 5,
  //       type: "SINGLE",
  //     },
  //     liked: true,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "1ncgAHI3hgM0TuCF93oTYZ",
  //       name: "Just A Hit",
  //       duration_ms: 171268,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/3d6500d957babd5004dd6df31b3078031cf43f58?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "4Bxk4PebmsWgvjMrtQqBvq",
  //       name: "HEY JUNE!",
  //       genres: ["pinoy indie", "opm", "harana", "kundiman"],
  //       followers: "44.7K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5ebd87fcd3c3cc05d42348a616c",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b2739ca9c6d540b5b3a57049f511",
  //       id: "3tnWvvCDGDMgwmLztawfLa",
  //       name: "Just A Hit",
  //       release_date: "2021-12-24",
  //       total_tracks: 1,
  //       type: "SINGLE",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "4Rmir5xpVSOWJleOolmjPC",
  //       name: "liwanag",
  //       duration_ms: 232500,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/f6f044bf278945fcfc5a34cd42aaf5d8ea8c237f?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "2D7VJeNRHoVQgxnNXxR9cK",
  //       name: "unikko ijo",
  //       genres: ["pinoy indie", "opm", "harana"],
  //       followers: "23.2K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb754b9509ca89bc8fa0c69279",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b27328aa1fd1539dfcf6f556b1a0",
  //       id: "40SLgZII4h3vzCpxVCaxP3",
  //       name: "ang magulong silid",
  //       release_date: "2022-04-12",
  //       total_tracks: 12,
  //       type: "ALBUM",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "24UGTxdthMCsk5oGuijETp",
  //       name: "Wag Na Lang",
  //       duration_ms: 337440,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/6bc7c13b8e96d030707ee4ad52306ee0f6ed92a7?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "4QKtNlghZ96NU9m7TG0FY4",
  //       name: "Drive of Daydreams",
  //       genres: ["opm", "pinoy indie", "harana", "kundiman"],
  //       followers: "10.7K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb208ff4a42b7ed28177880021",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b2733cdcd927e8625bb2e2b42385",
  //       id: "5IfAkDXpd7dALmMTxNAWXV",
  //       name: "Daydreams Vol. 1",
  //       release_date: "2022-02-11",
  //       total_tracks: 8,
  //       type: "ALBUM",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "1oLP82FPGloWIdrqWDWbHe",
  //       name: "Leave Me out of It",
  //       duration_ms: 241946,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/30062016a344cd8766b77a11eb3714cd4b04acdf?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "6sYQTuRBvPAaQ9Ba5ca1Yc",
  //       name: "SOS",
  //       genres: ["pinoy indie", "opm"],
  //       followers: "57.3K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb4e4b71c4c625d78e8edd5330",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b273b04cfc8803654c09dd4c8d12",
  //       id: "2uyyArQ1wjffioF0PemIe4",
  //       name: "Whatever That Was",
  //       release_date: "2017-09-17",
  //       total_tracks: 11,
  //       type: "ALBUM",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "5hvqC3Xiz3Ll2yZtaBPnvi",
  //       name: "Bituin",
  //       duration_ms: 287507,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/634eefd703b5ad397d043113684577186e97f41f?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "0S19WmQWKCpBiKIbDJOmeC",
  //       name: "Letters From June",
  //       genres: ["opm", "harana", "pinoy indie"],
  //       followers: "15.0K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb792ed1441a25920f226db71c",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b273e1f69228cac2b2bd4d44b061",
  //       id: "5L9nPMD38a9DkRzyfIFOtT",
  //       name: "Bituin",
  //       release_date: "2024-06-14",
  //       total_tracks: 1,
  //       type: "SINGLE",
  //     },
  //     liked: true,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "2GzMAz7YsYY2jhCUntStoR",
  //       name: "hindi mo lang alam",
  //       duration_ms: 286529,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/a7f54a69aff69bbfaa420076a8e804319985a568?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "1ubI85xbtCKFV5YO9SZrIJ",
  //       name: "Ian Quiruz",
  //       genres: ["pinoy indie", "opm", "kundiman", "harana"],
  //       followers: "27.9K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb7c989120018f59dc9156b168",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b2734e0d881751c5e679bf0f2e3b",
  //       id: "0js392IqDpyc0gTYE6FcM2",
  //       name: "SA KUBLIHAN",
  //       release_date: "2023-09-13",
  //       total_tracks: 8,
  //       type: "ALBUM",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "3Y8qRvjeLCQDRCe82lXdVm",
  //       name: "anxious heart (don't be tired of me)",
  //       duration_ms: 254798,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/65d727899b917a5bb932b986ddc8709140fb8cbd?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "6buyTec2V7K6LVmL74MLl2",
  //       name: "geiko",
  //       genres: ["opm", "pinoy indie", "harana", "kundiman"],
  //       followers: "94.3K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5ebe5da3b093550479075fdfcab",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b27301fabdd155c49d577a5095d7",
  //       id: "7aiHWZnRhclHIIQgRdntcl",
  //       name: "anxious heart (don't be tired of me)",
  //       release_date: "2024-02-23",
  //       total_tracks: 1,
  //       type: "SINGLE",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "19qvp23a0iXjzS72nqOi8u",
  //       name: "Sa'yo",
  //       duration_ms: 352445,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/0c9797f51b8ac93dbca8bea33bf7417628838bb7?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "4eKq7eArL96wSQjaaMg9Ic",
  //       name: "Munimuni",
  //       genres: ["opm", "pinoy indie", "harana", "kundiman"],
  //       followers: "994.9K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb0a0eabc1dd41d11425c288b1",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b273b4c9745d3ca4f4644dde92cc",
  //       id: "0wlV4A2q8N2ubZJpJeqDTi",
  //       name: "Simula",
  //       release_date: "2017-03-17",
  //       total_tracks: 6,
  //       type: "SINGLE",
  //     },
  //     liked: true,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "7IA3kgXFupu6eke77kd93n",
  //       name: "Baby Girl",
  //       duration_ms: 177614,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/b345e6832842c1ab272dc84459b8476c7e701afe?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "0WleeEe3UurwlNbDGhb5Yz",
  //       name: "ALLMO$T",
  //       genres: ["pinoy hip hop", "pinoy r&b", "opm", "p-pop"],
  //       followers: "902.1K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb1b9c7024e35dd3488cd9d953",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b27363084f54007ac2de3906c90b",
  //       id: "3P0dIqUcznPkh3KXtIZioC",
  //       name: "Baby Girl",
  //       release_date: "2025-05-30",
  //       total_tracks: 1,
  //       type: "SINGLE",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "3M9ZlNsdyW7O5yWYYhkqip",
  //       name: "Alitaptap",
  //       duration_ms: 236444,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/25c22003a734481b4018b3620932ad8d9254a38e?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "5xPS5Chr0YYtb1VmZJqz38",
  //       name: "Matt Wilson",
  //       genres: ["opm", "harana", "kundiman"],
  //       followers: "17.1K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb3bff3bf9c98e75675bb93746",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b273c78838ef00c1865228269354",
  //       id: "63v49wfOqvf4Z0NCMRtV1F",
  //       name: "Alitaptap",
  //       release_date: "2023-01-20",
  //       total_tracks: 1,
  //       type: "SINGLE",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "1eV6utlwOpkcqrlVgsIyhp",
  //       name: "Huwag Mo Nang Itanong",
  //       duration_ms: 278973,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/9ea1f88f0b1e3271f7d7c6478463e2e6b58d6ff5?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "0TkeMndS0mrWcPcQzbfIp5",
  //       name: "ALYSON",
  //       genres: ["pinoy indie", "opm", "city pop", "kundiman", "harana"],
  //       followers: "16.7K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5ebe02123716b72205e15568fa1",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b273d730ce858de6b5bf8768b4f1",
  //       id: "7JnMkGO7ZPeZhL7kCZ7iMG",
  //       name: "Huwag Mo Nang Itanong",
  //       release_date: "2025-05-30",
  //       total_tracks: 1,
  //       type: "SINGLE",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "49jaaNDXs4MtSB385rYBmG",
  //       name: "Cutterpillow",
  //       duration_ms: 137493,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/963215cf256e3b9e770d0be5be82b7d06918f107?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "5FW3vzEP2gQB3RQRNmR6ON",
  //       name: "ena mori",
  //       genres: ["pinoy indie", "opm"],
  //       followers: "20.9K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb58e07b5264d3a61b2f63da85",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b2737168817044aa121f050a82bb",
  //       id: "4UWQh3BN66Ba2Q8FHFEujq",
  //       name: "Cutterpillow",
  //       release_date: "2025-05-30",
  //       total_tracks: 1,
  //       type: "SINGLE",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "2DABJpDDPUaCWqZ9nMgkw4",
  //       name: "Pag-ibig ng Ikaw at Ako",
  //       duration_ms: 280828,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/2d2ef5aecbb148376f5a10c401be7df62eb6724a?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "48veLPCIJh5NVQxhyNRKCm",
  //       name: "Earl Agustin",
  //       genres: ["opm", "harana", "p-pop", "kundiman"],
  //       followers: "600.1K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5ebc4637e7e5379e9132b921a33",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b27337546fbc54fa46d970ccd207",
  //       id: "4AxnZ4xJ266tS2n435qdMU",
  //       name: "Himig at Pag-ibig",
  //       release_date: "2025-06-13",
  //       total_tracks: 10,
  //       type: "ALBUM",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "5YJvGgkhx20VYT64YgRZm2",
  //       name: "Oh, Irog",
  //       duration_ms: 296714,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/618d06798a29b03a67f35c19585d72a7047b8ee9?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "1WzkRNh7qkdpJIIuJ0ZWWG",
  //       name: "12th Street",
  //       genres: ["opm", "harana", "pinoy indie"],
  //       followers: "19.4K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb1139a994494f4ea4c4d66ce4",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b273b5545dae6632e3b0196d75fa",
  //       id: "3Ln0sjWYwOb0YNw9ew4StY",
  //       name: "Oh, Irog",
  //       release_date: "2025-02-14",
  //       total_tracks: 1,
  //       type: "SINGLE",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "4JmOHNTEYsI8FE2yq6HmxZ",
  //       name: "ayoko na",
  //       duration_ms: 215841,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/53529c00c412de5b6f6c03e13443ebe9f3c338a9?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "2D7VJeNRHoVQgxnNXxR9cK",
  //       name: "unikko ijo",
  //       genres: ["pinoy indie", "opm", "harana"],
  //       followers: "23.2K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb754b9509ca89bc8fa0c69279",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b27328aa1fd1539dfcf6f556b1a0",
  //       id: "40SLgZII4h3vzCpxVCaxP3",
  //       name: "ang magulong silid",
  //       release_date: "2022-04-12",
  //       total_tracks: 12,
  //       type: "ALBUM",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "0wjQVNXsgWvfvTaFG29WiU",
  //       name: "Dakilain Ka",
  //       duration_ms: 172951,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/2937be299eefb7cf1dda820e50ca272dac32c3b6?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "0GnuCXvnvVtX5DShryuyp9",
  //       name: "Aiza Seguerra",
  //       genres: ["opm", "p-pop"],
  //       followers: "534.9K",
  //       image:
  //         "https://i.scdn.co/image/de59d9b857c7eaef27df3b78d6b773c797c36106",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b27385dbbd1241bda194fc8bda00",
  //       id: "7LRgjehtZ8cUnz223HBbqq",
  //       name: "Palakasin Mo Ako",
  //       release_date: "2025-06-16",
  //       total_tracks: 8,
  //       type: "ALBUM",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "1tC2PLqLeJXt0VlgOYpc6m",
  //       name: "Bawat Piyesa",
  //       duration_ms: 386000,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/b8e5854384a5af9498c65413882777b033006d4f?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "4eKq7eArL96wSQjaaMg9Ic",
  //       name: "Munimuni",
  //       genres: ["opm", "pinoy indie", "harana", "kundiman"],
  //       followers: "994.9K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb0a0eabc1dd41d11425c288b1",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b273eb2c555e2bc57e190dc11702",
  //       id: "0BDVa2cVDEhfy3telrAIux",
  //       name: "Kulayan Natin",
  //       release_date: "2019-07-26",
  //       total_tracks: 11,
  //       type: "ALBUM",
  //     },
  //     liked: true,
  //     isFollowing: false,
  //   },
  //   {
  //     track: {
  //       id: "4dJgF7Nwn8aCPiQ9Xyad5l",
  //       name: "Buntong-Hininga",
  //       duration_ms: 257825,
  //       preview_url:
  //         "https://p.scdn.co/mp3-preview/524adfc5a25b583181f50b783efc27c296f4c369?cid=fe3e71cec6fb48b0acc9c29f050e8f9d",
  //     },
  //     artist: {
  //       id: "2zFBNsALb4M2FhKl98wcvd",
  //       name: "Johnoy Danao",
  //       genres: ["opm", "pinoy indie", "kundiman", "harana"],
  //       followers: "111.7K",
  //       image:
  //         "https://i.scdn.co/image/ab6761610000e5eb3d6c1b76b59c0749fd6e0392",
  //     },
  //     album: {
  //       cover:
  //         "https://i.scdn.co/image/ab67616d0000b273cc30dbb1d10ba73f39d6154e",
  //       id: "0mp0KDDCpNdearEAmEFBjQ",
  //       name: "Samu't-Sari",
  //       release_date: "2014-04-03",
  //       total_tracks: 12,
  //       type: "ALBUM",
  //     },
  //     liked: false,
  //     isFollowing: false,
  //   },
  // ]);

  const recommendations: Recommendations[] = useLoaderData();

  return <Feed recommendations={recommendations} />;
}
