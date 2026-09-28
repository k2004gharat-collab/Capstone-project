import { useState } from "react";
import Modal from "./Modal";
import Tabs from "./Tabs";
import Disclosure from "./Disclosure";
import "./Playground.css";

export default function Playground() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="playground">
          <div className="playground-container">
      <h1>Accessible Component Playground</h1>

      <section className="playground-section">
        <h2>Modal Dialog</h2>

       <button
  className="open-modal-button"
  type="button"
  onClick={() => setIsModalOpen(true)}
>
  Open Modal
</button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
        >
          <p>
            This is a manually built accessible modal dialog.
          </p>

          <label htmlFor="example-input">
            Your name
          </label>

          <input
            id="example-input"
            type="text"
            placeholder="Enter your name"
          />
        </Modal>
      </section>

      <section className="playground-section">
  <h2>Tabs</h2>

  <Tabs
    tabs={[
      {
        label: "Overview",
        content: (
          <p>
            This is the overview panel.
          </p>
        ),
      },
      {
        label: "Features",
        content: (
          <p>
            These are the features of the application.
          </p>
        ),
      },
      {
        label: "Settings",
        content: (
          <p>
            These are the settings.
          </p>
        ),
      },
    ]}
  />
</section>
<section className="playground-section">
  <h2>Disclosure</h2>

  <Disclosure title="What is this project?">
    <p>
      This playground contains three accessible React
      components built from scratch: a modal, tabs, and
      disclosure.
    </p>
  </Disclosure>
</section>

</div>
    </main>
  );
}