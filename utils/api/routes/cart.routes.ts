const apiHost = process.env.NEXT_PUBLIC_SERVER;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const cartRoutes = {
	cart: `${apiHost}/${apiVersion}/cart`,
	delete: `${apiHost}/${apiVersion}/cart/remove`,
	add: `${apiHost}/${apiVersion}/cart/add`,
};
