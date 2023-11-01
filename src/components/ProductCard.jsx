import React, { useState } from 'react';
import { Card, CardContent, Typography, styled, Box } from '@mui/material';

const ProductCardRoot = styled(Card)(({ theme, isHovered }) => ({
    border: !isHovered ? '1px solid #f0f0f0' : 'none',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    boxShadow: isHovered ? '0px 10px 20px rgba(0, 0, 0, 0.2)' : 'none',
    zIndex: isHovered ? 1 : 'auto',
    transition: '0.3s',
}));

const CardActionArea = styled(CardContent)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    top: 10,
    left: 0,
    width: '100%',
    height: '100%',
}));

const Title = styled(Typography)(({theme, isHovered}) => ({
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: 20,
    cursor: 'pointer',
    whiteSpace: isHovered ? 'normal' : 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}));

const DescriptionContainer = styled(Box)({
    maxHeight: '150px',
    overflowY: 'auto',
});

const Description = styled(Typography)({
    fontSize: '1rem',
    marginBottom: 8,
});

const Image = styled('img')({
    width: '100%',
    height: '200px',
    objectFit: 'contain',
});

const Price = styled(Typography)({
    fontSize: '1.25rem',
    color: 'green',
    marginTop: 'auto',
});

const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);

    const toggleHover = () => {
        setIsHovered(!isHovered);
    };

    return (
        <ProductCardRoot onMouseEnter={toggleHover} onMouseLeave={toggleHover} isHovered={isHovered}>
            <Image src={product.image} alt={product.title} />
            <CardActionArea>
                <Title variant="h6" isHovered={isHovered}>
                    {product.title}
                </Title>
                <DescriptionContainer>
                    <Description variant="body2">{product.description}</Description>
                </DescriptionContainer>
                <Price variant="body1">${product.price.toFixed(2)}</Price>
            </CardActionArea>
        </ProductCardRoot>
    );
};

export default ProductCard;
