import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

import { Animated, Dimensions, Image, Modal, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');
// Calculate card dimensions to ensure fit
const CARD_WIDTH = width * 0.8;
const CARD_ASPECT_RATIO = 0.67; // 2:3
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;
const PREVIEW_HEIGHT = CARD_HEIGHT + 60; // Card height + padding for top/bottom

const COLORS = {
    kumkum: '#A70002',
    akshid: '#FFFFE4',
    textRed: '#CC0E0E',
    haldi: '#F3D870',
    darkHaldi: '#F29502',
};

const Tabs = [
    { id: 'details', icon: 'edit', label: 'Event Details' },
    { id: 'theme', icon: 'palette', label: 'Theme & Format' },
];

// Text Styling Options
const TEXT_COLORS = [
    COLORS.textRed,
    COLORS.kumkum,
    COLORS.darkHaldi,
    '#000000', // Black
    '#FFFFFF', // White
    '#1A237E', // Navy Blue
    '#004D40', // Teal
];

const FONTS = [
    { id: 'system', label: 'System', value: 'System' },
    { id: 'serif', label: 'Serif', value: 'serif' },
    { id: 'monospace', label: 'Mono', value: 'monospace' },
    // In a real app, we would load custom fonts here.
    // For now, we rely on basic system font variants.
];

// Template Data
const TEMPLATES = [
    { id: 't1', image: require('../../../../assets/EventMimg/Einvite/ring1.jpg'), name: 'Classic Gold' },
    { id: 't2', image: require('../../../../assets/EventMimg/Einvite/ring2.jpg'), name: 'Floral Bliss' },
    { id: 't3', image: require('../../../../assets/EventMimg/Einvite/ring3.jpg'), name: 'Royal Blue' },
    { id: 't4', image: require('../../../../assets/EventMimg/Einvite/ring4.png'), name: 'Modern Minimal' },
];

const InviteStudioScreen = ({ navigation, route }) => {
    const { eventType } = route.params || { eventType: 'Wedding' };
    const [activeTab, setActiveTab] = useState('details');
    const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
    const [customStyle, setCustomStyle] = useState({
        textColor: COLORS.textRed,
        fontFamily: 'System' // Default
    });
    const [modalVisible, setModalVisible] = useState(false);
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const headerShadow = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [0, 5],
        extrapolate: 'clamp',
    });

    // Form State
    const [eventDetails, setEventDetails] = useState({
        title: 'Wedding Ceremony',
        names: 'Aarav & Ananya',
        host: 'Mrs. & Mr. Sharma',
        date: '24 - 01 - 2026',
        time: '7:00 PM',
        venue: 'The Leela Palace, Udaipur',
        message: 'We request the honor of your presence at our wedding ceremony.'
    });

    const renderPreviewCard = () => (
        <View style={styles.previewCard}>
            <Image
                source={selectedTemplate.image}
                style={styles.previewImage}
                resizeMode="cover"
            />
            <View style={styles.overlayContainer}>
                <Text style={[styles.overlayTitle, { color: customStyle.textColor, fontFamily: customStyle.fontFamily === 'serif' ? 'serif' : 'System' }]}>
                    {eventDetails.title}
                </Text>
                <Text style={[styles.overlayCouple, { color: COLORS.kumkum, fontFamily: customStyle.fontFamily === 'serif' ? 'serif' : 'System' }]}>
                    {/* Keep Couple Name distinct or link to customStyle if desired. Let's link it to font but keep Red color for emphasis? Or user full control?
                        Let's give full control for now or keep couple name emphasis.
                        User asked for "select color for card content". Usually main text follows this.
                        I will apply custom color to everything for simplicity, except maybe divider.
                     */}
                    {eventDetails.names}
                </Text>
                <Text style={[styles.overlayHost, { color: customStyle.textColor, fontFamily: customStyle.fontFamily }]}>
                    {eventDetails.host}
                </Text>
                <View style={styles.overlayDivider} />
                <Text style={[styles.overlayDate, { color: customStyle.textColor, fontFamily: customStyle.fontFamily }]}>
                    {eventDetails.date} | {eventDetails.time}
                </Text>
                <Text style={[styles.overlayVenue, { color: customStyle.textColor, fontFamily: customStyle.fontFamily }]}>
                    {eventDetails.venue}
                </Text>

            </View>
        </View>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'details':
                return (
                    <View style={styles.tabContent}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Event Title</Text>
                            <TextInput
                                style={styles.input}
                                value={eventDetails.title}
                                onChangeText={(text) => setEventDetails({ ...eventDetails, title: text })}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Couple / Host Names</Text>
                            <TextInput
                                style={styles.input}
                                value={eventDetails.names}
                                onChangeText={(text) => setEventDetails({ ...eventDetails, names: text })}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Host Line (Optional)</Text>
                            <TextInput
                                style={styles.input}
                                value={eventDetails.host}
                                onChangeText={(text) => setEventDetails({ ...eventDetails, host: text })}
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                                <Text style={styles.label}>Date</Text>
                                <View style={styles.dateInputContainer}>
                                    <TextInput
                                        style={styles.dateInput}
                                        value={eventDetails.date}
                                        onChangeText={(text) => setEventDetails({ ...eventDetails, date: text })}
                                    />
                                    <FontAwesome5 name="calendar-alt" size={16} color="#333" style={styles.inputIcon} />
                                </View>
                            </View>
                            <View style={[styles.formGroup, { flex: 1 }]}>
                                <Text style={styles.label}>Time</Text>
                                <TextInput
                                    style={styles.input}
                                    value={eventDetails.time}
                                    onChangeText={(text) => setEventDetails({ ...eventDetails, time: text })}
                                />
                            </View>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Venue Check-in</Text>
                            <TextInput
                                style={styles.input}
                                value={eventDetails.venue}
                                onChangeText={(text) => setEventDetails({ ...eventDetails, venue: text })}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Invitation Message</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={eventDetails.message}
                                onChangeText={(text) => setEventDetails({ ...eventDetails, message: text })}
                                multiline
                                textAlignVertical="top"
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.viewCardButton}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.viewCardText}>View Card</Text>
                            <FontAwesome5 name="arrow-right" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                );
            case 'theme':
                return (
                    <View style={styles.tabContent}>
                        <Text style={styles.sectionTitle}>Select Template</Text>
                        <View style={styles.templatesGrid}>
                            {TEMPLATES.map((template) => (
                                <TouchableOpacity
                                    key={template.id}
                                    style={[
                                        styles.templateItem,
                                        selectedTemplate.id === template.id && styles.selectedTemplate
                                    ]}
                                    onPress={() => setSelectedTemplate(template)}
                                >
                                    <Image source={template.image} style={styles.templateThumb} resizeMode="cover" />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.sectionTitle}>Text Color</Text>
                        <View style={styles.colorRow}>
                            {TEXT_COLORS.map((color, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.colorOption,
                                        { backgroundColor: color },
                                        customStyle.textColor === color && styles.selectedColor
                                    ]}
                                    onPress={() => setCustomStyle({ ...customStyle, textColor: color })}
                                />
                            ))}
                        </View>

                        <Text style={styles.sectionTitle}>Font Style</Text>
                        <View style={styles.fontRow}>
                            {FONTS.map((font) => (
                                <TouchableOpacity
                                    key={font.id}
                                    style={[
                                        styles.fontOption,
                                        customStyle.fontFamily === font.value && styles.selectedFont
                                    ]}
                                    onPress={() => setCustomStyle({ ...customStyle, fontFamily: font.value })}
                                >
                                    <Text style={[styles.fontLabel, { fontFamily: font.value === 'System' ? undefined : font.value }]}>
                                        {font.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                    </View>
                );



            default:
                return (
                    <View style={styles.tabContent}>
                        <Text style={styles.sectionTitle}>Coming Soon</Text>
                        <Text style={styles.sectionDesc}>This feature is under development.</Text>
                    </View>
                );
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.akshid} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.kumkum} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Invite Studio:{eventType}</Text>
                <TouchableOpacity
                    style={styles.saveButton}
                >
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>

            {/* Main Content Area */}
            <View style={{ flex: 1 }}>

                {/* Background: Preview Card (Fixed / Parallax) */}
                <View style={styles.previewContainer}>
                    {renderPreviewCard()}
                </View>

                {/* Foreground: Scrollable Details */}
                <Animated.ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingTop: PREVIEW_HEIGHT - 40 }} // Overlap slightly
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.controlsContainer}>
                        {/* Tabs */}
                        <View style={styles.tabBar}>
                            {Tabs.map((tab) => (
                                <TouchableOpacity
                                    key={tab.id}
                                    style={[styles.tabItem, activeTab === tab.id && styles.activeTab]}
                                    onPress={() => setActiveTab(tab.id)}
                                >
                                    <FontAwesome5
                                        name={tab.icon}
                                        size={16}
                                        color={activeTab === tab.id ? COLORS.kumkum : '#666'}
                                    />
                                    <Text style={[styles.tabLabel, activeTab === tab.id && styles.activeTabLabel]}>
                                        {tab.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Tab Content */}
                        <View style={styles.contentArea}>
                            {renderTabContent()}
                        </View>
                    </View>
                </Animated.ScrollView>

                {/* Full Screen View Modal */}
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={30} color="#fff" />
                        </TouchableOpacity>
                        <View style={styles.modalContent}>
                            {renderPreviewCard()}
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};
// End of component

const FormatOption = ({ icon, label }) => (
    <TouchableOpacity style={styles.formatOption}>
        <FontAwesome5 name={icon} size={24} color="#333" />
        <Text style={styles.formatLabel}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.akshid,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center', // Removed centering to bring title closer to arrow
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: COLORS.akshid,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.haldi,
        marginTop: 30,
        zIndex: 10,
        position: 'relative',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textRed,
    },
    backButton: {
        // position: 'absolute', // Removed absolute positioning
        // left: 20,
        marginRight: 10, // Small gap between arrow and title
        padding: 5,
    },
    saveButton: {
        position: 'absolute',
        right: 20,
        bottom: -15, // Move down to overlap header edge (half of approx 30-40px height)
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: COLORS.kumkum,
        borderRadius: 20,
        elevation: 5, // Shadow for Android
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    saveText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    viewCardButton: {
        backgroundColor: COLORS.kumkum,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 10,
    },
    viewCardText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    previewContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: PREVIEW_HEIGHT,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        zIndex: 0,
    },
    previewCard: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        // aspectRatio: CARD_ASPECT_RATIO, // Removed to avoid conflict with explicit height
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    previewText: {
        color: '#888',
        fontSize: 16,
    },
    controlsContainer: {
        backgroundColor: COLORS.akshid,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: height - 100, // Ensure enough scroll space
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 1,
        borderColor: COLORS.haldi,
    },
    contentArea: {
        padding: 20,
        paddingBottom: 50,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: COLORS.akshid,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.haldi,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.kumkum,
        backgroundColor: COLORS.akshid,
    },
    tabLabel: {
        fontSize: 10,
        marginTop: 4,
        color: '#666',
        textAlign: 'center',
    },
    activeTabLabel: {
        color: COLORS.kumkum,
        fontWeight: 'bold',
    },
    contentScroll: {
        padding: 20,
    },
    tabContent: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        color: COLORS.textRed,
        marginTop: 10,
    },
    templatesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    templateItem: {
        width: '48%',
        aspectRatio: 0.7,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.haldi,
        overflow: 'hidden',
        backgroundColor: '#eee',
    },
    selectedTemplate: {
        borderColor: COLORS.kumkum,
    },
    templateThumb: {
        width: '100%',
        height: '100%',
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    formatOption: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        aspectRatio: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    formatLabel: {
        marginTop: 8,
        fontSize: 12,
        color: '#333',
    },
    placeholderBox: {
        height: 100,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    sectionDesc: {
        fontSize: 14,
        color: '#666',
    },
    // Form Styles
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 14,
        color: '#333',
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        paddingRight: 10,
    },
    dateInput: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 14,
        color: '#333',
    },
    inputIcon: {
        marginLeft: 5,
    },
    textArea: {
        height: 80,
    },
    // Overlay Styles
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.1)', // Slight dark tint for readability if needed, or remove
        borderRadius: 15,
    },
    overlayTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4a2c2a', // Dark Brown/Red
        marginBottom: 10,
        textAlign: 'center',
        textShadowColor: 'rgba(255, 255, 255, 0.6)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    overlayCouple: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#A70002', // Main Red
        marginBottom: 5,
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    },
    overlayHost: {
        fontSize: 12,
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    overlayDivider: {
        width: 50,
        height: 1,
        backgroundColor: '#A70002',
        marginBottom: 15,
    },
    overlayDate: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
    },
    overlayVenue: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        maxWidth: '80%',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
        padding: 10,
    },
    // Style Options
    colorRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 2,
    },
    selectedColor: {
        borderWidth: 3,
        borderColor: COLORS.kumkum, // Highlight selected
    },
    fontRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    fontOption: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#eee',
        borderRadius: 8,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    selectedFont: {
        backgroundColor: COLORS.akshid,
        borderColor: COLORS.kumkum,
    },
    fontLabel: {
        fontSize: 14,
        color: '#333',
    },
});

export default InviteStudioScreen;
