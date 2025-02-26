"use client";
import { useEffect } from "react";
import { getSession, signOut } from "next-auth/react";

function SessionChecker() {
	useEffect(() => {
		const checkSession = async () => {
			try {
				// Attempt to get the session
				const session = await getSession();
				// Use the session...
			} catch (e: any) {
				if (e.message === "Token has expired") {
					// The token has expired. Log out the user.
					signOut();
				}
			}
		};

		// Check the session every 5 minute
		const intervalId = setInterval(checkSession, 5 * 60 * 1000);

		// Clear the interval when the component is unmounted
		return () => clearInterval(intervalId);
	}, []);

	return null; // This component does not render anything
}

export default SessionChecker;
