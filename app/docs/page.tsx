import Accordion from "../components/accordion";

const Docs = () => {
	return (
		<div className='container mx-auto px-4'>
			<h1 className='text-2xl font-bold my-4'>Dokumentacja</h1>
			<Accordion title='1. Główne założenia aplikacji'>
				<p className='w-3/4'>
					Aplikacja GastroHero służy do szerokopojętego zarządzania restauracją.
					Użytkownik najpierw tworzy profil restauracji, w której rejestruje pracowników. Główny użytkownik może w profilu restauracji tworzyć konta pracowników, nadawać im uprawnienia (np.: kucharz ma wgląd do receptur i mepa, a kelner ma wgląd do rezerwacji, zamówień na sali, stanu dań - gdy czegoś brakuje - itp.). Aplikacja posiada czaty pracownicze, które również mogą być dzielone na grupy pracowników. 
				</p>
			</Accordion>
			<Accordion title='Tytuł Dokumentu 2'>
				<p className='w-3/4'>
					zamówienia, rezerwację, czat pracowniczy, statystyki dań, godziny
					pracowników, receptury, mep pracowniczy, stany magazynowe.
				</p>
			</Accordion>
		</div>
	);
};

export default Docs;
