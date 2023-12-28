import React from 'react';
import { Ticket } from '../components/content/Content';

interface OfferListProps {
    filteredTickets: Ticket[];
    showMoreCount: number;
    handleShowMore: () => void;
}

const OfferList: React.FC<OfferListProps> = ({ filteredTickets, showMoreCount, handleShowMore }) => {
    return (
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
    );
};

export default OfferList;
