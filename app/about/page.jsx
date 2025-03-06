import { Grid } from "lucide-react";
import React from "react";
import GridLines from "react-gridlines";

const About = () => {
    return (
        <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">About Oishichan</h1>
                <p className="mb-4">
                    Welcome to <strong>Oishichan</strong>, your ultimate recipe discovery platform! Our goal is to make cooking more accessible, enjoyable, and creative for everyone.
                </p>

                <h2 className="text-2xl font-semibold mt-6">Our Mission</h2>
                <p className="mb-4">
                    At Oishichan, we strive to provide a vast collection of recipes, tailored recommendations, and AI-powered assistance to simplify your cooking experience.
                </p>

                <h2 className="text-2xl font-semibold mt-6">Oishichan AI - Your Smart Cooking Assistant</h2>
                <p className="mb-4">
                    Meet <strong>Oishichan AI</strong>, our intelligent assistant designed to make recipe discovery easier. Whether you need ingredient substitutions, step-by-step guidance, or meal planning ideas, Oishichan AI is here to help!
                </p>

                <h2 className="text-2xl font-semibold mt-6">Why Choose Oishichan?</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>AI-powered recipe suggestions tailored to your preferences.</li>
                    <li>A diverse collection of recipes from various cuisines.</li>
                    <li>Easy-to-follow instructions for beginners and experts alike.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">Join Our Community</h2>
                <p className="mb-4">
                    We believe in the power of food to bring people together. Share your recipes, explore new dishes, and be part of the Oishichan community!
                </p>

                <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
                <p>
                    Have any questions or feedback? Reach out to us at <a href="mailto:support@oishichan.com" className="text-blue-600 hover:underline">support@oishichan.com</a>.
                </p>
        </div>
    );
};

export default About;
