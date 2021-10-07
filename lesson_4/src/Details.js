import React, { useContext, useEffect } from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import { navigate } from "@reach/router";
import Modal from "./Modal";

export default function DetailsErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <Details {...props}>
            </Details></ErrorBoundary>
    );
}

class Details extends React.Component {
    state = { loading: true, showModal: false };

    componentDidMount() {
        pet
            .animal(+this.props.id)
            .then(({ animal }) => {
                this.setState({
                    name: animal.name,
                    animal: animal.type,
                    location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
                    description: animal.description,
                    media: animal.photos,
                    breed: animal.breeds.primary,
                    loading: false,
                    url: animal.url,
                });
            })
            .catch(err => this.setState({ error: err }));
    }

    toggleModal = () => this.setState({ showModal: !this.state.showModal });
    adopt = () => navigate(this.state.url);
    render() {
        if (this.state.loading) {
            return <h1>loading ...</h1>
        }

        // const [theme] = useContext(ThemeContext);

        const { animal, breed, location, description, media, name, url, showModal } = this.state;
        return (
            <div className="details">
                <Carousel media={media}></Carousel>
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} - ${breed} - ${location}`}</h2>
                    <ThemeContext.Consumer>
                        {([theme]) => (
                            <button style={{ backgroundColor: theme }} onClick={this.toggleModal}>
                                Adopt {name}
                            </button>
                        )}
                    </ThemeContext.Consumer>
                    <p>{description}</p>
                    {
                        showModal ? (
                            <Modal>
                                <div>
                                    <h1> Would you like to adopt {name}?</h1>
                                    <div className="buttons">
                                        <button onClick={this.adopt}>Yes</button>
                                        <button onClick={this.toggleModal}>No</button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null
                    }
                </div>
            </div>
        );
    }
}


// export default Details;