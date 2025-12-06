import { ref } from 'vue'
interface Question {
    title: string
    answer: string
    isActive: boolean
}

export const questions = ref<Question[]>([
    {
        title: "Why shouldn't we trust atoms?",
        answer: "Atoms are too small to be trusted. They are too fragile and prone to break down.",
        isActive: false
    },
    {
        title: "What do you call someone with no body and no nose?",
        answer: "A frog.",
        isActive: false
    },
    {
        answer: "Inheritance.",
        title: "What's the object-oriented way to become wealthy?",
        isActive: false,
    },
    {
        title: "How many tickles does it take to tickle an octopus?",
        answer: "Ten-tickles.",
        isActive: false,

    },
    {
        title: "What is: 1 + 1?",
        answer: "2",
        isActive: false,
    }
])