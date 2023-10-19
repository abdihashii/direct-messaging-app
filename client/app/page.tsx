import Chat from "./components/Chat"
import type {Message} from "./types"
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function Home() {
	const cookieStore = cookies()
	const supabase = createServerComponentClient({ cookies: () => cookieStore })

	let { data: chats, error } = await supabase
		.from('chats')
		.select()
		.eq('id', '1dfb9e26-4711-4ba3-98ca-da893894745d');

	if (error) console.error(error);
	
	const [chat] = chats;
	const {id: chat_id, user_1_id, user_2_id} = chat;

	const {data: messages, error: messageError} = await supabase
		.from('messages')
		.select()
		.eq('chat_id', chat_id);

	if (messageError) console.error(messageError);

	const {data: userData, error: profileError} = await supabase
		.from('profiles')
		.select()
		.eq('id', user_1_id)
		.single();

	if (profileError) console.error(profileError);
	
	return (
		<main className="flex flex-col h-[100vh] bg-gray-500 w-full gap-6">
			{/* Header */}
			<section
				className="w-full flex flex-row gap-2 py-8 px-8 border-b border-b-gray-200"
			>
				<p>Back</p>
				<p>Avatar</p>
				<p>Name</p>
				<p className="ml-auto">Settings</p>
			</section>

			{/* Chat */}
			<Chat messagesData={messages} user={userData} />
		</main>
	)
}
