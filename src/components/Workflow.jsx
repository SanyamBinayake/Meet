import React from 'react';
import { UserCheck, PhoneCall, Wrench } from 'lucide-react';

const Workflow = () => {
    const steps = [
        { icon: <UserCheck size={32} />, title: "1. Pick a Plumber", desc: "Browse profiles, ratings, and specialties." },
        { icon: <PhoneCall size={32} />, title: "2. Call Coordinator", desc: "Dial our central line to book your expert." },
        { icon: <Wrench size={32} />, title: "3. Service Delivery", desc: "Our verified pro arrives at your doorstep." }
    ];

    return (
        <section id="workflow" className="workflow-section">
            <div className="container">
                <h2>How It Works</h2>
                <div className="steps-container">
                    {steps.map((step, index) => (
                        <div key={index} className="step-card">
                            <div className="icon-wrapper">{step.icon}</div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Workflow;
