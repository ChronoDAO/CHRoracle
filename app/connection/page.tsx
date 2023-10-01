import AddNameComponent from "@/components/Add/AddName";
import YesNoCheckbox from "@/components/Checkbox/Checkbox";

export default function Connection() {
  return (
    <div>
      <header>
        <h1>MY ACCOUNT</h1>
      </header>

      <main>
        <section>
          <h3>Add your Openloot to visualize your indicators</h3>
          <AddNameComponent />
        </section>

        {/* <section>
          <h3>Do you have an old Openloot name ?</h3>
          <YesNoCheckbox />
          <AddNameComponent />
        </section> */}
      </main>
    </div>
  );
}
