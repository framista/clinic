import React from 'react';
import './systems.css';
import { List, ListItem, ListItemIcon, Checkbox, ListItemText } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectSystems,
    toogleOptionInSystem,
} from '../slice';

const Systems = () => {

    const dispatch = useDispatch();
    const systems = useSelector(selectSystems);
    const handleToggle = (systemIndex, optionIndex) => () => {
        dispatch(toogleOptionInSystem({systemIndex, optionIndex}))
    };

    return (
        <div className="systemscontainer">
            {systems.map((system, systemIndex) => {
                const { content, options } = system;
                return (
                    <div className="system">
                        <h6>{content}</h6>
                        <List className="system__list">
                            {options.map((option, optionIndex) => {
                                const { content, value } = option;
                                return (
                                    <div className="systems__item">
                                        <ListItem key={10 * systemIndex + optionIndex} role={undefined} dense button onClick={handleToggle(systemIndex, optionIndex)}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={value}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={content} />
                                        </ListItem>
                                    </div>
                                )
                            })}
                        </List>
                    </div>
                )
            })}
        </div>

    )

}

export default Systems;