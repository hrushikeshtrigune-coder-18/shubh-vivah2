import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import VendorCard from '../../../components/VendorCard';
import venue1 from '../../../../assets/images/venue1.jpg';
import venue2 from '../../../../assets/images/venue2.jpg';
import venue3 from '../../../../assets/images/venue3.jpg';
import venue4 from '../../../../assets/images/venue4.jpg';
import venue5 from '../../../../assets/images/venue5.jpg';
import venue6 from '../../../../assets/images/venue6.jpg';
import venue7 from '../../../../assets/images/venue7.jpg';
import venue8 from '../../../../assets/images/venue8.jpg';

const { width } = Dimensions.get('window');

const MOCK_VENDORS = [
    {
        id: 'v1',
        name: 'Heritage Decorators',
        rating: 4.9,
        tag: 'Heritage Decor',
        location: 'Worli, Mumbai',
        city: 'Mumbai',
        image: venue1,
        previews: [venue6, venue7, venue8]
    },
    {
        id: 'v2',
        name: 'Royal Floral Designs',
        rating: 4.8,
        tag: 'Premium Floral',
        location: 'Koregaon Park, Pune',
        city: 'Pune',
        image: venue2,
        previews: [venue5, venue3, venue4]
    },
    {
        id: 'v3',
        name: 'The Wedding Studio',
        rating: 4.7,
        tag: 'Luxury Decor',
        location: 'Civil Lines, Jaipur',
        city: 'Jaipur',
        image: venue3,
        previews: [venue1, venue2, venue8]
    }
];

const VendorListScreen = ({ navigation, route }: { navigation?: any; route?: any }) => {
    const { serviceName, serviceId } = route.params || {};

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{serviceName || 'Vendors'}</Text>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.sectionTitle}>Our Vendors</Text>
                {MOCK_VENDORS.map((vendor) => (
                    <VendorCard
                        key={vendor.id}
                        vendor={vendor}
                        onPress={() => console.log('Vendor Pressed')}
                        cardWidth={width - 40}
                        containerStyle={styles.cardContainer}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 22,
        fontFamily: 'Outfit_700Bold',
        color: '#333',
    },
    scrollContent: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 28,
        fontFamily: 'Outfit_700Bold',
        color: '#8B0000',
        marginBottom: 20,
    },
    cardContainer: {
        marginBottom: 25,
        alignSelf: 'center',
    },
});

export default VendorListScreen;
