import React from 'react';

const FavouritesContext = React.createContext();

class FavouritesProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            favourites: []
        };

        this.updateFavourites = this.updateFavourites.bind(this);
    }

    updateFavourites(photo) {
        this.setState(prevState => ({
            favourites: [...prevState.favourites, photo]
        }))
    }

    render() {
        return(
            <FavouritesContext.Provider value={{favourites: this.state.favourites, updateFavourites: this.updateFavourites}}>
                {this.props.children}
            </FavouritesContext.Provider>
        )
    }
}

const FavouritesConsumer = FavouritesContext.Consumer;

export {FavouritesProvider, FavouritesConsumer };
