<script>
	import { tick } from 'svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { flip } from "svelte/animate";
	import Button from "./UI/Button.svelte"
	import { v4 as uuidv4 } from 'uuid';


	let notes = []

	const saveToLocalStorage = (name, value) => {
		localStorage.setItem(name, value);
	}

	const saveArrayToLocalStorage = (name, array) => {
		saveToLocalStorage(name, JSON.stringify(array))
	}

	const getValueFromStorage = (name) => {
		return localStorage.getItem(name);
	}

	const getArrayFromLocalStorage = (name) => {
		return JSON.parse(getValueFromStorage(name))
	}

	const saveNotes = () => {
		saveArrayToLocalStorage('notes', notes)
	}

	const getNotes = (event) => {
		tick().then(() => {
			const localNotes = getArrayFromLocalStorage('notes')
			if (localNotes) {
				notes = [...localNotes]
			}
		})
	}

	function randomChoice(choices) {
		const index = Math.floor(Math.random() * choices.length);
		return choices[index];
	}

	const randomColorClass = () => {
		const colors = [
			"bg-red-400",
			"bg-orange-400",
			"bg-amber-400",
			"bg-amber-400",
			"bg-lime-400",
			"bg-green-400",
			"bg-emerald-400",
			"bg-teal-400",
			"bg-cyan-400",
			"bg-sky-400",
			"bg-blue-400",
			"bg-indigo-400",
			"bg-violet-400",
			"bg-purple-400",
			"bg-fuchsia-400",
			"bg-pink-400",
			"bg-rose-400",
		]
		return randomChoice(colors)
	}

	const addNote = () => {
		notes = [
		...notes,	
		{
			id: uuidv4(),
			color: randomColorClass(),
			text: "",
			sticky: false,
		}
		]
		tick().then(() => {
			saveNotes()
		})
	}
	
	const saveNote = (note) => {
		tick().then(() => {
			const indexOfNote = notes.indexOf(note)
			const noteElement = document.getElementById(note.id)

			note.text = noteElement.textContent
			notes[indexOfNote] = note
			saveNotes()
		})
	}

	const stickyNote = (note) => {
		const indexOfNote = notes.indexOf(note)
		const noteElement = document.getElementById(note.id)
		note.sticky = !note.sticky
		notes[indexOfNote] = note
		tick().then(() => {
			saveNotes()
		})
	}

	const deleteNote = (id) => {
		notes = notes.filter(n => n.id != id)
		tick().then(() => {
			saveNotes()
		})
	}



	onMount(async () => {
		getNotes()
	});

</script>

<svelte:window on:storage={getNotes}/>


<div class="bg-gray-900 h-full w-full min-h-screen flex flex-col items-center">
	<div class="max-w-7xl p-8 space-y-8 w-full">
		<div class="flex items-center justify-between">
			<h1 class="text-white text-4xl font-medium">Notes</h1>
			<div class="fixed p-8 bottom-0 right-0 z-20 md:static md:p-0">
				<Button className="rounded-full primary p-4 shadow-lg shadow-black/40 md:rounded-lg" on:click="{addNote}">
					<i class="fa-solid fa-plus fa-fw text-2xl"></i>
					<span class="hidden md:block">Add Note</span>
				</Button>
			</div>
		</div>
		<main class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 duration-300 ">
			{#each notes as note (note.id)}
				<div transition:fly animate:flip="{{duration: 300}}" class="relative shadow-lg rounded-lg overflow-hidden aspect-square flex flex-col {note.color}" class:order-first="{note.sticky}">
					<div class="flex justify-between items-center bg-black/20 hover:bg-black/25 cursor-pointer">
						<Button className="opacity-40 {note.sticky ? 'opacity-80' : 'hover:opacity-80'} p-2" on:click="{stickyNote(note)}">
							<div class="text-black aspect-square">
								<i class="fa-solid fa-thumbtack fa-fw text-sm"></i>
							</div>
						</Button>
						<Button className="opacity-40 hover:opacity-80 p-2" on:click="{deleteNote(note.id)}">
							<div class="text-black aspect-square">
								<i class="fa-solid fa-close fa-fw text-sm"></i>
							</div>
						</Button>
					</div>
					<div id="{note.id}" contentEditable="true" class="prose h-full w-full text-black/80 p-4 text-lg font-medium" on:input="{saveNote(note)}">
						{note.text}
					</div>
				</div>
			{/each}
		</main>
	</div>
</div>
