import api from "@/ultils/axiosInstance";
import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";

type ImageWrapperProps = {
    image: string
}

const ImageWrapper: React.FC<ImageWrapperProps> = ({ image }) => {
    console.log("Image: ", image)

    const isBase64ImageUri = (uri: string): boolean => {
        if (!uri || typeof uri !== 'string') return false;

        const base64ImagePattern = /^data:image\/(png|jpg|jpeg|gif|webp|bmp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;

        return base64ImagePattern.test(uri.trim());
    };

    const [imageUri, setImageUri] = useState<string | null>(null);
    useEffect(() => {
        const loadImage = async () => {
            try {
                if (isBase64ImageUri(image)) {
                    console.log(image)
                    
                    setImageUri(image)
                } else {
                    const response = await api.get(`/clothes/image?${image}`, { responseType: 'blob' })

                    if (response.status != 200) throw new Error('Failed to fetch image');

                    const blob = response.data;
                    const reader = new FileReader();

                    reader.onloadend = () => {
                        setImageUri(reader.result as string);
                    };

                    reader.readAsDataURL(blob);
                }
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };

        loadImage();
    }, [image]);

    return (
        <Image source={{ uri: imageUri || '' }} style={styles.image} resizeMode="contain" />
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'cover',
    }
});

export default ImageWrapper