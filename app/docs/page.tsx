import Accordion from "../components/accordion";

const Docs = () => {
	return (
		<div className='container mx-auto px-4'>
			<h1 className='text-2xl font-bold my-4'>Dokumentacja</h1>
			<Accordion title='1. Główne założenia aplikacji'>
				<p className='w-3/4'>
					Aplikacja GastroHero służy do szerokopojętego zarządzania restauracją.
					Użytkownik najpierw tworzy profil restauracji, w której rejestruje
					pracowników. Główny użytkownik może w profilu restauracji tworzyć
					konta pracowników, nadawać im uprawnienia (np.: kucharz ma wgląd do
					receptur i mepa, a kelner ma wgląd do rezerwacji, zamówień na sali,
					stanu dań - gdy czegoś brakuje - itp.). Aplikacja posiada czaty
					pracownicze, które również mogą być dzielone na grupy pracowników.
				</p>
			</Accordion>
			<Accordion title='Technologia'>
				<div className='w-3/4'>
					<p>
						- Frontend - Frontend aplikacji napisany jest w React, za pomocą
						biblioteki Next14.js. W tej części projektu korzystam z supersetu
						TypeScript, do stylowania używam biblioteki TailwindCSS.{" "}
					</p>
					<p>
						- Backend - Serwer aplikacji zbudowany jest w języku programowania
						Python, za pomocą biblioteki Flask. Baza danych jest zarządzana za
						pomocą SQLAlchemy. Obsługuję w tej części aplikacji rządania CORS
						(Cross-Origin Resource Sharing), a także generuję tokeny JWT w celu
						autoryzacji użytkownika.
					</p>
				</div>
			</Accordion>
			<Accordion title='Aktualna wersja'>
				<p className='w-3/4'>
					Użytkownik jest w stanie stworzyć konto restauracji, a następnie
					utworzyć konta pracownicze, i przypisać do nich utworzone przez siebie
					role - pozycje.
				</p>
			</Accordion>
			<Accordion title='Co jeszcze chciałbym dodać?'>
				<p className='w-3/4'>
					zamówienia, rezerwację, czat pracowniczy, statystyki dań, godziny
					pracowników, receptury, mep pracowniczy, stany magazynowe.
				</p>
			</Accordion>
			<Accordion title='Repozytoria'>
				<div className='w-3/4'>
					<p>
						Frontend -{" "}
						<a href='https://github.com/DUP3RELE/GastroHero'>GastroHero</a> -{" "}
					</p>
					<p>
						Backend -
						<a href='https://github.com/DUP3RELE/HotpotEngine'>HotpotEngine</a>{" "}
						-
					</p>
				</div>
			</Accordion>
		</div>
	);
};

export default Docs;
