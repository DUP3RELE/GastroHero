import Accordion from '../components/accordion';

const Docs = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Dokumentacja</h1>
      <Accordion title="Tytuł Dokumentu 1">
        Treść dokumentu 1...
      </Accordion>
      <Accordion title="Tytuł Dokumentu 2">
        Treść dokumentu 2...
      </Accordion>
    </div>
  );
};

export default Docs;