import { useLocation } from "react-router-dom";

export function Character () {
    const location = useLocation();
    const {info} = location.state;

    return (
        <div>{info.name}</div>
    )
}