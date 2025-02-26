export const getUserFullName = (
  firstName?: string,
  lastName?: string,
  gender?: "man" | "woman"
): string => {
  if (!firstName || !lastName) return "کاربر گرامی";

  const honorific =
    gender === "man"
      ? "جناب آقای"
      : gender === "woman"
        ? "سرکار خانم"
        : "جناب آقای/سرکار خانم";

  return `${honorific} ${firstName} ${lastName}`;
};
