import Navbar_Staff from "@/components/navbar_staff";

export default function Anonymization(props) {
  return (
    <>
      <Navbar_Staff role={props.role} />
      <div className="h-screen bg-gray-200">
        <div className="mx-auto max-w-7xl divide-y-2 divide-slate-400 px-2 py-8 sm:px-6 lg:px-8">
          <div className="py-8"></div>
        </div>
      </div>
    </>
  );
}
