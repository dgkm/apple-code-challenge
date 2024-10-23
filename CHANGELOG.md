#### 0.1.0 (2024-10-23)

##### Chores

*  enable editor auto fix on save action ([deddcad0](https://github.com/dgkm/apple-code-challenge/commit/commit/deddcad0d8668d0861701d0aad06e05568fd5dc5))
*  db file with data ([942f8097](https://github.com/dgkm/apple-code-challenge/commit/commit/942f8097146b3f663468bd6b1e4320bfb4571102))
*  added format script to package.json ([ccbde522](https://github.com/dgkm/apple-code-challenge/commit/commit/ccbde5228c15af6383c099b4a5c6a3836720f01d))
*  pnpm install lock file ([1e871fef](https://github.com/dgkm/apple-code-challenge/commit/commit/1e871fef0bac6464090443ab1d9b09f506b6126c))

##### New Features

*  infinite loading functionality ([2cc49faf](https://github.com/dgkm/apple-code-challenge/commit/commit/2cc49faf366765aeeff9dc64e1a2e203ab8a1707))
*  memorising search keywords ([81232a2d](https://github.com/dgkm/apple-code-challenge/commit/commit/81232a2df2905e62d4112fca4229c480aef48dcc))
*  memorising page number ([24e7092b](https://github.com/dgkm/apple-code-challenge/commit/commit/24e7092b41b1583102d76559bd7ffa2421c9758e))
*  loading assets by pagination ([5ff0af97](https://github.com/dgkm/apple-code-challenge/commit/commit/5ff0af973fdc93bb5e7e4f3798afba8deed972a5))
*  backend with host search functionality ([cad2f23f](https://github.com/dgkm/apple-code-challenge/commit/commit/cad2f23f7b1b80d69fcb2c2a4d352154fa48cadd))
*  enabled caching page functionality ([1066c52b](https://github.com/dgkm/apple-code-challenge/commit/commit/1066c52b6bd1524a043471b4460932facb08029a))
*  added make file ([82e7b0da](https://github.com/dgkm/apple-code-challenge/commit/commit/82e7b0da0705ca7821039e7de44363611195d39a))
*  added gin gzip configuration ([a7d3b6cd](https://github.com/dgkm/apple-code-challenge/commit/commit/a7d3b6cd2db144020f3e34e48c05c183792a1f6b))
*  router and db functions with pagination support ([a3b4e6d3](https://github.com/dgkm/apple-code-challenge/commit/commit/a3b4e6d38dbf972f8af747b390108b1df6b0e257))
*  added json field annotations ([64deaca6](https://github.com/dgkm/apple-code-challenge/commit/commit/64deaca60a8052e4a63f4b64b3e2c07b0f99f1ca))
*  router, database, types modules separation ([eb4f366e](https://github.com/dgkm/apple-code-challenge/commit/commit/eb4f366e803fe08b61a7464f43595321d28dc248))
*  page were updated to use env, api and contants ([1080b71e](https://github.com/dgkm/apple-code-challenge/commit/commit/1080b71e73a6362318c38c509e29284cd87960de))
*  error pages added ([fccad62b](https://github.com/dgkm/apple-code-challenge/commit/commit/fccad62b34f5df971e1c5a05f684dc210d28d8af))
*  loading pages added ([0072a9a7](https://github.com/dgkm/apple-code-challenge/commit/commit/0072a9a78c88002ba3ef9f42028e889487b8a748))
*  use common signature generation functions and skip signature generation if not empty ([92ce1130](https://github.com/dgkm/apple-code-challenge/commit/commit/92ce11305415a3d01f40753acdafe4c6366817a5))
*  add signature in the data generation ([9d76a272](https://github.com/dgkm/apple-code-challenge/commit/commit/9d76a272147a44c35bd62b1e6cea19b42a53b380))
*  added layout with navigation and created separate landing pages for original (slow), pagination and infinite patterns ([418f975c](https://github.com/dgkm/apple-code-challenge/commit/commit/418f975ccf035420e4a41734b2a48d77bcb145aa))
*  log format update with response byte size ([737d05e8](https://github.com/dgkm/apple-code-challenge/commit/commit/737d05e8e6716e7ce7475b75f8a2c32ee0b9127e))

##### Bug Fixes

*  pagination and search memorising between pages ([c14ff5ad](https://github.com/dgkm/apple-code-challenge/commit/commit/c14ff5ad6746bf5e64e5a322c51226951a2c8a1b))
*  pagination with total records ([6239289a](https://github.com/dgkm/apple-code-challenge/commit/commit/6239289a734db6561f65797bc63f648eb9946cad))
*  update pages to work without source ([06b132e0](https://github.com/dgkm/apple-code-challenge/commit/commit/06b132e035a3e08fdb75b342cd99104beede0e61))
*  frontend api by id ([668435e5](https://github.com/dgkm/apple-code-challenge/commit/commit/668435e5a3048fb5ab6573715eef12367c128cf8))

##### Other Changes

*  sorting at the api level rather than client ([83316f4a](https://github.com/dgkm/apple-code-challenge/commit/commit/83316f4a606e358764f39c45d24ce58d8af6a4e3))

##### Refactors

*  asset details component to disable link ([099de040](https://github.com/dgkm/apple-code-challenge/commit/commit/099de040cf187b2505c637c1bbc967f01d8aca06))
*  updated all the pages to work with the api change with response type and metadata ([db16d10a](https://github.com/dgkm/apple-code-challenge/commit/commit/db16d10ae4050d47066522c5edb745dd0fb84ab1))
*  removed println ([7ed6c2f9](https://github.com/dgkm/apple-code-challenge/commit/commit/7ed6c2f96b5c243633d7752a190593183dd8c30c))
*  asset item page update ([17752aab](https://github.com/dgkm/apple-code-challenge/commit/commit/17752aabdc3847496caa5be768c0352cb2127871))
*  package for signature and generator functions ([8ce92f26](https://github.com/dgkm/apple-code-challenge/commit/commit/8ce92f2638b3b64d24364bcbfd8f5b73664f0fe4))

##### Code Style Changes

*  asset item responsive ([30da9edc](https://github.com/dgkm/apple-code-challenge/commit/commit/30da9edc697f3ef5e7663047c46b68d4299b8401))
*  page section component and asset item upate ([894cb8f5](https://github.com/dgkm/apple-code-challenge/commit/commit/894cb8f5d67cc20bee1dd20a03320b97ea6fb262))
*  navigaton bar and menu item update ([3354bc54](https://github.com/dgkm/apple-code-challenge/commit/commit/3354bc54c8d7f4c91c12a99cb9fa10bffe4e803e))

##### Tests

*  home page test ([8b41d16c](https://github.com/dgkm/apple-code-challenge/commit/commit/8b41d16c8dd8d3b131ed576e53b568deb9d2e5f2))
*  jest config update ([7ed15bc2](https://github.com/dgkm/apple-code-challenge/commit/commit/7ed15bc2f255fb9a767d4681f7398ebe02ed3e9a))

