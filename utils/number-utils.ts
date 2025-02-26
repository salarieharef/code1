export const prependZero = (number: string) => {
	const reg = /^0[0-9].*$/;
	return reg.test(number) ? number : "0" + number;
};
