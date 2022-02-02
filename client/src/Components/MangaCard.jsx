import { Link } from 'react-router-dom'

const Card = () => {
    return (
        <div>
            <h1>Manga</h1>
            <Link to='/detail'>
                <button>+</button>
            </Link>
        </div>
    )
}

export default Card