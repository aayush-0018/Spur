import { prisma } from "../lib/prisma";

const faqData = [
    {
        category: "shipping",
        question: "How long does shipping take?",
        answer: "Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days.",
    },
    {
        category: "shipping",
        question: "Do you offer free shipping?",
        answer: "Yes! We offer FREE shipping on orders over $50 to USA and Canada.",
    },
    {
        category: "returns",
        question: "What is your return policy?",
        answer: "We offer a 30-day money-back guarantee on all products. Items must be in original condition with all packaging intact.",
    },
    {
        category: "returns",
        question: "How do I return an item?",
        answer: "Contact our support team at support@techhubstore.com with your order number. We'll provide you with a return label and instructions.",
    },
    {
        category: "support_hours",
        question: "What are your support hours?",
        answer: "We're available Monday to Friday, 9 AM to 6 PM EST. Weekend support is available for urgent issues.",
    },
    {
        category: "support_hours",
        question: "How can I contact support?",
        answer: "Email us at support@techhubstore.com or use our chat widget. We typically respond within 24 hours.",
    },
];

async function seed() {
    console.log("🌱 Seeding database...");

    try {
        // Clear existing FAQs
        await prisma.faqItem.deleteMany();

        // Seed FAQ items
        for (const faq of faqData) {
            await prisma.faqItem.create({
                data: faq,
            });
        }

        console.log("✅ Database seeded successfully!");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
