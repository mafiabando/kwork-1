// src/app/components/Tooltip.tsx
import React, { useEffect, useRef, useState } from "react";

interface TooltipProps {
    isOpen: boolean;
    image?: string;
    description: string;
    position: { top: number; left: number }; // Эти координаты должны быть относительно родительского элемента с position: relative
}

const Tooltip: React.FC<TooltipProps> = ({ isOpen, image, description, position }) => {
    const [isTablet, setIsTablet] = useState(false);
    const [tooltipStyle, setTooltipStyle] = useState({
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translate(-50%, -100%)',
    });
    const [arrowStyle, setArrowStyle] = useState({
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
    });

    const tooltipRef = useRef<HTMLDivElement>(null);

    // Для адаптивности
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsTablet(width < 1024);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Эффект для расчета позиции и смещения стрелки
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const calculateAndSetStyles = () => {
            if (tooltipRef.current) {
                const tooltipRect = tooltipRef.current.getBoundingClientRect();
                const windowWidth = window.innerWidth;

                let newLeft = position.left;
                let newTop = position.top;
                let arrowLeft = '50%';
                let arrowTransform = 'translateX(-50%)';

                if (isTablet) {
                    // Прижимаем к левому краю контейнера на планшетах
                    newLeft = 0;
                    // Центр тултипа теперь в координате newLeft (0)
                    // Центр стрелки должен быть над центром вопросительного знака (position.left)
                    // Смещение стрелки от левого края тултипа (newLeft = 0) до центра знака (position.left)
                    arrowLeft = `${position.left - 7}px`;
                    arrowTransform = 'none';
                } else {
                    // Проверяем, не выходит ли тултип за правую границу окна
                    if (newLeft + tooltipRect.width / 2 > windowWidth) {
                        newLeft = windowWidth - tooltipRect.width / 2;
                    }

                    // Проверяем, не выходит ли тултип за левую границу окна
                    if (newLeft - tooltipRect.width / 2 < 0) {
                        newLeft = tooltipRect.width / 2;
                    }
                    arrowLeft = `${position.left - newLeft + tooltipRect.width / 2 - 7}px`;
                    arrowTransform = 'none';
                }

                // Обновляем стили
                setTooltipStyle({
                    top: `${newTop}px`,
                    left: `${newLeft}px`,
                    transform: isTablet ? 'translate(0, -100%)' : 'translate(-50%, -100%)',
                });

                setArrowStyle({
                    top: '100%',
                    left: arrowLeft,
                    transform: arrowTransform,
                });
            }
        };

        calculateAndSetStyles();

        window.addEventListener('resize', calculateAndSetStyles);
        return () => window.removeEventListener('resize', calculateAndSetStyles);
    }, [position, isTablet, isOpen]);

    if (!isOpen) return null;

    return (
        <div
            ref={tooltipRef}
            className="absolute z-50 bg-[#2c3a54] rounded-lg p-4 shadow-lg max-w-xs"
            style={{
                ...tooltipStyle,
                pointerEvents: 'none',
            }}
        >
            {/* Стрелка */}
            <div
                className="absolute w-0 h-0 border-l-[8px] border-[#2c3a54] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent"
                style={{
                    ...arrowStyle,
                    zIndex: 1,
                }}
            ></div>

            {image && (
                <img
                    src={image}
                    alt="Информация"
                    className="w-full h-auto object-contain mb-2 rounded-lg"
                />
            )}
            <p className="text-sm">{description}</p>
        </div>
    );
};

export default Tooltip;