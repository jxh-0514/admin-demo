export default {
	namespaced: true, // 开启命名空间
	state: {
		layout: [], // 拖拽大屏布局
	},
	mutations: {
		// 设置布局
		SET_LAYOUT(state, layout) {
			console.log("保存布局---", layout);

			state.layout = layout;
		},
	},
	actions: {
		// 设置布局
		setLayout({ commit }, layout) {
			commit("SET_LAYOUT", layout);
		},
	},
};
