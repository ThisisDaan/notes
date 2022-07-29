<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { flip } from "svelte/animate";
	import Button from "./UI/Button.svelte"

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

	const getNotes = () => {
		const localNotes = getArrayFromLocalStorage('notes')
		if (localNotes) {
			notes = localNotes
		}
	}

	const addNote = () => {
		notes = [
		...notes,	
		{
			id: crypto.randomUUID(),
			text: "",
		}
		]
		saveNotes()
	}
	
	const saveNote = (note) => {
		const indexOfNote = notes.indexOf(note)
		const noteElement = document.getElementById(note.id)
		note.text = noteElement.textContent
		notes[indexOfNote] = note
		saveNotes()
	}

	const deleteNote = (id) => {
		notes = notes.filter(n => n.id != id)
		saveNotes()
	}

	onMount(async () => {
		getNotes()
	});

</script>

<div class="p-8 space-y-8 bg-gray-900 h-full w-full min-h-screen">
	<h1 class="text-white text-2xl">Note</h1>
	<Button type="primary" on:click="{addNote}">Add Note</Button>
	<main class="grid grid-cols-3 grid-rows-4 gap-8 duration-300">
		{#each notes as note (note.id)}
			<div transition:fly animate:flip="{{duration: 300}}" class="ring-2 rounded-lg p-4 w-96 h-96 flex flex-col space-y-4">
				<div id="{note.id}" contentEditable="true" class="prose h-full w-full text-white" on:input="{saveNote(note)}">
					{note.text}
				</div>
				<div class="flex">
					<div class="ml-auto ">
						<Button type="danger" on:click="{deleteNote(note.id)}">
							<div class="text-white aspect-square">
								<i class="fa-solid fa-trash fa-fw"></i>
							</div>
						</Button>
					</div>
				</div>
			</div>
		{/each}
	</main>
</div>
