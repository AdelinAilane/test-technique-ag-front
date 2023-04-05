

import CreateOffer from './CreateOffer';
import {render} from "@testing-library/react";
import {OfferListOptions} from "../OfferList/OfferList";
import {useState} from "react";
import {MarketType} from "../../../core/enum/market-type.enum";

describe('CreateOffer', () => {
    it('renders CreateOffer component', () => {
        const setPageListOptions = jest.fn(() => {
                return {page: 0, filter: {marketType: MarketType.PRIMARY_RESERVE}};
            });

                /*jest
                    .spyOn(React, 'useState')
                    .mockImplementationOnce(initState => [initState, setState]);
                */

                const {
                    getByText
                } = render(<CreateOffer  setPageListOptions={setPageListOptions} />);
                const element = getByText(/Ajouter une offre/i);
                expect(element).toBeInTheDocument();
        });
});
