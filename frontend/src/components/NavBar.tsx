import { MenuItem } from "./MenuItem"

export const Navbar = () => {

    return (
        <nav>
            <h3>Asset Inventory</h3>
            <MenuItem href="/">Home</MenuItem>
            <MenuItem href="/assets/pagination" icon>Assets (by pagination)</MenuItem>
            <MenuItem href="/assets/infinite" icon>Assets (by infinite)</MenuItem>
            <MenuItem href="/assets/default">Default Page</MenuItem>
            <MenuItem href="/components">Included Components</MenuItem>
        </nav>
    )

}
