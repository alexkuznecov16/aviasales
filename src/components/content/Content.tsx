import React from 'react';
import './Content.css';

import airBaltic_icon from '../../assets/airBaltic.png';
import ernestAirlines_icon from '../../assets/ErnestAirlines.png';
import ryanair_icon from '../../assets/Ryanair.png';
import FilterBlock from '../../modules/FilterBlock';

export interface TicketTime {
    startTime: string;
    endTime: string;
}

export interface Ticket {
    id: number;
    from: string;
    to: string;
    company: 'AirBaltic' | 'Ryanair' | 'Ernest airlines';
    imgURL: string;
    price: number;
    currency: 'EUR' | 'USD' | 'RUB';
    time: TicketTime;
    duration: number;
    date: string;
    connectionAmount: number;
}

const mockTickets: Ticket[] = [
    {
        id: 1,
        from: 'Riga',
        to: 'Turkey',
        company: 'Ryanair',
        imgURL: ryanair_icon,
        price: 4500,
        currency: 'EUR',
        time: { startTime: '11:30', endTime: '15:00' },
        duration: 3.5,
        date: '2023-12-31',
        connectionAmount: 2,
    },
    {
        id: 2,
        from: 'Riga',
        to: 'Frankfurt-Hahn',
        company: 'AirBaltic',
        imgURL: airBaltic_icon,
        price: 3000,
        currency: 'EUR',
        time: { startTime: '08:30', endTime: '10:45' },
        duration: 2.25,
        date: '2023-12-26',
        connectionAmount: 1,
    },
    {
        id: 3,
        from: 'Frankfurt-Hahn',
        to: 'Riga',
        company: 'Ryanair',
        imgURL: ryanair_icon,
        price: 4000,
        currency: 'EUR',
        time: { startTime: '14:15', endTime: '16:30' },
        duration: 2.25,
        date: '2023-12-27',
        connectionAmount: 2,
    },
    {
        id: 4,
        from: 'Oslo',
        to: 'Riga',
        company: 'Ernest airlines',
        imgURL: ernestAirlines_icon,
        price: 3500,
        currency: 'EUR',
        time: { startTime: '12:45', endTime: '14:30' },
        duration: 1.75,
        date: '2023-12-28',
        connectionAmount: 1,
    },
    {
        id: 5,
        from: 'Riga',
        to: 'Oslo',
        company: 'AirBaltic',
        imgURL: airBaltic_icon,
        price: 3800,
        currency: 'EUR',
        time: { startTime: '09:00', endTime: '11:00' },
        duration: 2,
        date: '2023-12-29',
        connectionAmount: 3,
    },
    {
        id: 6,
        from: 'Oslo',
        to: 'Frankfurt-Hahn',
        company: 'Ryanair',
        imgURL: ryanair_icon,
        price: 3200,
        currency: 'EUR',
        time: { startTime: '16:30', endTime: '18:45' },
        duration: 2.25,
        date: '2023-12-30',
        connectionAmount: 0,
    },
    {
        id: 7,
        from: 'Riga',
        to: 'Minsk',
        company: 'AirBaltic',
        imgURL: airBaltic_icon,
        price: 150,
        currency: 'EUR',
        time: { startTime: '16:30', endTime: '17:10' },
        duration: 0.4,
        date: '2024-01-22',
        connectionAmount: 0,
    },
    {
        id: 8,
        from: 'Riga',
        to: 'Moscow',
        company: 'AirBaltic',
        imgURL: airBaltic_icon,
        price: 300,
        currency: 'EUR',
        time: { startTime: '00:30', endTime: '02:00' },
        duration: 1.3,
        date: '2024-01-26',
        connectionAmount: 0,
    },
    {
        id: 9,
        from: 'Moscow',
        to: 'Riga',
        company: 'Ryanair',
        imgURL: ryanair_icon,
        price: 29090,
        currency: 'RUB',
        time: { startTime: '06:30', endTime: '08:00' },
        duration: 1.3,
        date: '2024-01-29',
        connectionAmount: 0,
    },
];

const loadTicketsFromAPI = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockTickets);
        }, 200);
    });
};

const Content: React.FC = () => {
    const [tickets, setTickets] = React.useState<Ticket[]>([]); // tickets array
    const [showMoreCount, setShowMoreCount] = React.useState<number>(3); // show more tickets
    const [filterStops, setFilterStops] = React.useState<number[]>([]); // filters by stops
    const [filterCompanies, setFilterCompanies] = React.useState<string[]>([]);
    ['AirBaltic', 'Ryanair', 'Ernest airlines']; // filters by companies
    const [sortBy, setSortBy] = React.useState<string | null>(null); // sorting by criteria
    const [filteredTickets, setFilteredTickets] = React.useState<Ticket[]>([]); // filtered tickets array

    // returns tickets data
    React.useEffect(() => {
        const fetchData = async () => {
            const loadedTickets = await loadTicketsFromAPI();
            const sortedTickets = loadedTickets.sort((a, b) => a.id - b.id);
            setTickets(sortedTickets);
            setFilteredTickets(sortedTickets);
        };
        fetchData();
    }, []);

    // Sort tickets by criteria
    const sortTickets = (criteria: string) => {
        let sortedTickets = [...filteredTickets]; // sorted tickets props

        if (criteria === 'cheapest') {
            sortedTickets = sortedTickets.sort((a, b) => a.price - b.price);
        } else if (criteria === 'fastest') {
            sortedTickets = sortedTickets.sort((a, b) => a.duration - b.duration);
        } else if (criteria === 'optimal') {
            sortedTickets = sortedTickets.sort((a, b) => {
                const optimalValueA = a.price * a.duration;
                const optimalValueB = b.price * b.duration;
                return optimalValueA - optimalValueB;
            });
            sortBy;
        }

        setFilteredTickets(sortedTickets);
    };

    // sort tickets by criteria
    const handleSortChange = (criteria: string) => {
        setSortBy(criteria);
        sortTickets(criteria);
    };

    // onchange filter tickets
    const filterTickets = () => {
        if (filterStops.length === 0 && filterCompanies.length === 0) {
            // if active filter settings are <= 0 - return all tickets of array
            setFilteredTickets(tickets);
            return;
        }

        let result = [...tickets]; // result variable - ticket props

        // filter by stops count
        if (filterStops.length > 0) {
            // filter props tickets - if someone of ticket array has connectionAmount return the ticket with connectionAmount
            result = result.filter((ticket) => filterStops.includes(ticket.connectionAmount));
        }

        // Фильтрация по компаниям
        if (filterCompanies.length > 0) {
            // filter props tickets - if someone of ticket array has company name return the ticket with company name
            result = result.filter((ticket) => filterCompanies.includes(ticket.company));
        }

        // refresh the filter tickets result
        setFilteredTickets(result);
    };

    // Onchange filter tickets
    React.useEffect(() => {
        filterTickets();
    }, [filterStops, filterCompanies]);

    // Set filters for tickets and show tickets of filter settings
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target; // get the input element
        if (input.name === 'stops') {
            const stopValue = parseInt(input.value, 10); // parse string to integer number
            // if input is active clicked
            if (input.checked) {
                setFilterStops((prevFilterStops) => [...prevFilterStops, stopValue]); // set transfers filters. - open prevFilterStops and add stopValue
            } else {
                // if input is not active
                setFilterStops((prevFilterStops) => prevFilterStops.filter((stop) => stop !== stopValue)); // if works - remove stopValue from filters settings
            }
        } else if (input.name === 'companies') {
            const companyValue = input.value;
            if (input.checked) {
                setFilterCompanies((prevFilterCompanies) => [...prevFilterCompanies, companyValue]);
            } else {
                setFilterCompanies((prevFilterCompanies) => prevFilterCompanies.filter((company) => company !== companyValue));
            }
        }
    };

    // On click show +3 tickets if it is in the array of tickets
    const handleShowMore = () => {
        if (mockTickets.length <= 0) {
            alert('More not available!');
        } else {
            setShowMoreCount((prevCount) => prevCount + 3);
        }
    };

    return (
        <div className='content-app'>
            <div className='container'>
                <div className='blocks'>
                    <FilterBlock filterCompanies={filterCompanies} filterStops={filterStops} handleFilterChange={handleFilterChange} />
                    <div className='offer-block'>
                        <div className='offer-filter'>
                            <span onClick={() => handleSortChange('cheapest')}>The cheapest</span>
                            <span onClick={() => handleSortChange('fastest')}>The fastest</span>
                            <span onClick={() => handleSortChange('optimal')}>The most optimal</span>
                        </div>
                        {/* Доработать: все билеты добавить в отдельный компонент */}
                        <div className='offers'>
                            {filteredTickets.slice(0, showMoreCount).map((ticket) => (
                                <div key={ticket.id} className='offer'>
                                    <div className='offer-list'>
                                        <span className='item-1 price'>
                                            {ticket.price} {ticket.currency}
                                        </span>
                                        <span className='item-2 locations'>
                                            {ticket.from} - {ticket.to}
                                        </span>
                                        <span className='item-3 times'>
                                            {ticket.time.startTime} - {ticket.time.endTime}
                                        </span>
                                    </div>
                                    <div className='offer-list'>
                                        <span className='item-2 text'>In the way</span>
                                        <span className='item-3 times'>{ticket.duration} h</span>
                                    </div>
                                    <div className='offer-list'>
                                        <img className='item-1 company company-logo' src={ticket.imgURL} alt={ticket.company} />
                                        <span className='item-2 text'>Transfers</span>
                                        <span className='item-3 transfers'>
                                            {ticket.connectionAmount} {ticket.connectionAmount == 1 ? 'tranfer' : 'transfers'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {showMoreCount < filteredTickets.length ? (
                                <button className='showMoreBTN' onClick={handleShowMore}>
                                    Show more
                                </button>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;
