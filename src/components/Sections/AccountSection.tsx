import type { Database, Profiles } from "@types";
import { useState, useEffect } from "react";
import {
	useUser,
	useSupabaseClient,
	Session,
} from "@supabase/auth-helpers-react";

export const AccountSection = ({ session }: { session: Session }) => {
	const supabase = useSupabaseClient<Database>();
	const user = useUser();
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState<Profiles["username"]>(null);
	const [website, setWebsite] = useState<Profiles["website"]>(null);
	const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);

	useEffect(() => {
		getProfile();
	}, [session]);

	const getProfile = async () => {
		try {
			setLoading(true);
			if (!user) throw new Error("No user");

			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username, website, avatar_url`)
				.eq("id", user.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
				setWebsite(data.website);
				setAvatarUrl(data.avatar_url);
			}
		} catch (error) {
			alert("Error loading user data!");
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const updateProfile = async ({
		username,
		website,
		avatar_url,
	}: {
		username: Profiles["username"];
		website: Profiles["website"];
		avatar_url: Profiles["avatar_url"];
	}) => {
		try {
			setLoading(true);
			if (!user) throw new Error("No user");

			const updates = {
				id: user.id,
				username,
				website,
				avatar_url,
				updated_at: new Date().toISOString(),
			};

			let { error } = await supabase.from("profiles").upsert(updates);
			if (error) throw error;
			alert("Profile updated!");
		} catch (error) {
			alert("Error updating the data!");
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section>
			<div>
				<label htmlFor="email">Email</label>
				<input id="email" type="text" value={session.user.email} disabled />
			</div>
			<div>
				<label htmlFor="username">Username</label>
				<input
					id="username"
					type="text"
					value={username || ""}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="website">Website</label>
				<input
					id="website"
					type="url"
					value={website || ""}
					onChange={(e) => setWebsite(e.target.value)}
				/>
			</div>

			<div>
				<button
					onClick={() => updateProfile({ username, website, avatar_url })}
					disabled={loading}
				>
					{loading ? "Loading ..." : "Update"}
				</button>
			</div>

			<div>
				<button onClick={() => supabase.auth.signOut()}>Sign Out</button>
			</div>
		</section>
	);
};
