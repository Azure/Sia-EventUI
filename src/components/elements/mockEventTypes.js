export const mockEventTypesAbbreviated = [
    {
        'name': 'Bridge Join',
        'id': 1,
    },

    {
        'name': 'Impact Detected',
        'id': 3,
    },
    
    {
        'name': 'Escalation Started',
        'id': 15,
    }
]

export const mockEventTypes = {
    types: [
        {
            'name': 'Bridge Join',
            'id': 1,
            'actions': [
                {
                    'name': 'Lookup Person',
                    'actionTemplate': {
                        'name': 'Link To Who',
                        'isUrl': true,
                        'pattern': 'http://who/is/${Alias}',
                        'sources': [
                            {
                            'name': 'Alias',
                            'sourceObject': 0, //Event
                            'key': 'data.Alias'
                            }
                        ]
                    },
                    'conditionSets': [
                        {
                            'name': 'Has Alias',
                            'type': 1,
                            'conditions': [
                                {
                                    'name': 'Has Alias',
                                    'conditionSource' :{
                                        'name': 'Alias',
                                        'sourceObject': 0, //Event
                                        'key': 'data.Alias'
                                    },
                                    'assertionType': 0, //IsOrDoes
                                    'conditionType': 2, //HaveValue
                                    'dataFormat': 0 //string
                                }
                            ]
                        }
                    ]
                },
                {
                    'name': 'Ping Person',
                    'actionTemplate': {
                        'name': 'SIP Link',
                        'isUrl': true,
                        'pattern': 'sip:${Alias}',
                        'sources': [
                            {
                                'name': 'Alias',
                                'sourceObject': 0, //Event
                                'key': 'data.Alias'
                            }
                        ]
                    },
                    'conditionSets': [
                        {
                            'name': 'Has Alias',
                            'type': 1,
                            'conditions': [
                                {
                                    'name': 'Has Alias',
                                    'conditionSource' :{
                                    'name': 'Alias',
                                    'sourceObject': 0, //Event
                                    'key': 'data.Alias'
                                    },
                                    'assertionType': 0, //IsOrDoes
                                    'conditionType': 2, //HaveValue
                                    'dataFormat': 0 //string
                                }
                            ]
                        }
                    ]
                }
            ],
            'data': {
            },
            'displayTemplate': {
                'pattern': 'Bridge ${Action}: ${Alias} from ${Team} team.',
                'sources': [
                    {
                        'name': 'Alias',
                        'sourceObject': 0, //Event
                        'key': 'data.Alias'
                    },
                    {
                        'name': 'Team',
                        'sourceObject': 0, //Event
                        'key': 'data.Team'
                    },
                    {
                        'name': 'Action',
                        'sourceObject': 0, //Event
                        'key': 'data.Action'
                    }
                ]
            }
        },

        {
            'name': 'Impact Detected',
            'id': 3,
            'actions': [
                {
                    'name': 'Confirm Customer Impact',
                    'actionTemplate': {
                        'name': 'Customer Impact Confirmed Event',
                        'isUrl': false,
                        'pattern': '{\'id\':13,\'data\':{}}',
                        'sources': []
                    },
                    'conditionSets': []
                },
                {
                    'name': 'Confirm No Customer Impact',
                    'actionTemplate': {
                        'name': 'Confirmed: No Customer Impact Event',
                        'isUrl': false,
                        'pattern': '{\'id\':14,\'data\':{}}',
                        'sources': []
                    },
                    'conditionSets': []
                }
            ],
            'data': {},
            'displayTemplate': {
                'pattern': 'Impact Detected by ${Team}',
                'sources': [
                    {
                        'name': 'Team',
                        'sourceObject': 0, //Event
                        'key': 'data.team'
                    }
                ]
            }
        },

        {
            'name': 'Escalation Started',
            'id': 15,
            'actions': [
                {
                    'name': 'Cancel Escalation',
                    'actionTemplate': {
                    'name': 'Escalation Cancelled Event',
                    'isUrl': false,
                    'pattern': '{\'id\':16,\'data\':{\'team\':\'${Team}\'}}',
                    'sources': [
                        {
                        'name': 'Team',
                        'sourceObject': 0, //Event
                        'key': 'team'
                        }
                    ]
                },
                'conditionSets': []
                }
            ],
            'data': {},
            'displayTemplate': {
                'pattern': 'Escalation to ${Team} Started by ${Alias}',
                'sources': [
                    {
                        'name': 'Alias',
                        'sourceObject': 0, //Event
                        'key': 'data.alias'
                    },
                    {
                        'name': 'Team',
                        'sourceObject': 0, //Event
                        'key': 'data.team'
                    }
                ]
            }
        }
    ]
}

