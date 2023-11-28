import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Icon, Avatar } from '@rneui/themed';
import RedirectText from './RedirectText';
import WebViewTest from './staticPage/WebViewTest';

const styles = StyleSheet.create({
    accordion: {
        height: 50,
        width: '100%',
    },
});

interface AccordionProps {
    title: string;
}

const Accordion: React.FC<AccordionProps> = ({ title }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <ListItem.Accordion
                style={styles.accordion}
                content={
                    <>
                        <ListItem.Content>
                            <ListItem.Title>{title}</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded); // Toggle the expanded state
                }}
            >
                <View>
                    <RedirectText text={'redirecttext'} destination={'WebViewTest'} />
                    <RedirectText text={'redirecttext'} destination={'footerABC'} />
                </View>
            </ListItem.Accordion>
        </>
    );
};

export default Accordion;