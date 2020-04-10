module.exports = {
	// presets: ["@vue/app", "@vue/cli-plugin-babel/preset"],
	presets: ["@vue/app"],
	plugins: [
		[
			"import",
			{
				libraryName: "ant-design-vue",
				libraryDirectory: "es",
				style: true
			}
		],
		[
			"import",
			{
				libraryName: "vant",
				libraryDirectory: "es",
				style: true
			},
			"vant"
		]
	]
};
