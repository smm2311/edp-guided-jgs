import { useLocation } from "react-router-dom";

export function Film () {
    const location = useLocation();
    const {info} = location.state;

    return (
        <div>{info.title}</div>
    )
}