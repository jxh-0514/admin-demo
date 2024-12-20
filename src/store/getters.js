const getters = {
	sidebar: (state) => state.app.sidebar,
	device: (state) => state.app.device,
	token: (state) => state.user.token,
	avatar: (state) => state.user.avatar,
	name: (state) => state.user.name,
	roles: (state) => state.user.roles,
	introduction: (state) => state.user.introduction,
	permission_routes: (state) => state.permission.routes,
	layout: (state) => state.dragScreen.layout,
};
export default getters;
