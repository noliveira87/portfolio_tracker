import React, { useState } from 'react';

const Menu = ({ onAddInvestmentType }) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="menu">
            <button className="menu-button" onClick={handleMenuClick}>
                &#9776; {/* Ícone de menu */}
            </button>
            {showMenu && (
                <div className="menu-content">
                    <button onClick={onAddInvestmentType}>Tipo de Investimento</button>
                    {/* Adicione outros itens de menu aqui conforme necessário */}
                </div>
            )}
        </div>
    );
};

export default Menu;
