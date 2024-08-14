import React, { useState } from 'react';
import './Menu.css';

const Menu = ({ onAddInvestmentType, onAddSavings }) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="menu">
            <button className="menu-button" onClick={handleMenuClick}>
                <i className="fas fa-bars"></i>
            </button>
            {showMenu && (
                <div className="menu-content">
                    <button onClick={onAddInvestmentType}>Tipo de Investimento</button>
                    <button onClick={onAddSavings}>Adicionar Savings</button>
                </div>
            )}
        </div>
    );
};

export default Menu;
