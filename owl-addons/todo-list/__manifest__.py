{
    'name': "Owl Todo List",
    'version': '1.0',
    'depends': ['base'],
    'author': "Imron Syabani",
    'category': 'Tool',
    'description': """
    """,
    # data files always loaded at installation
    'data': [
        'security/ir.model.access.csv',
        'views/todolist_views.xml',
    ],
    # data files containing optionally loaded demonstration data
    'assets': {
        'web.assets_backend': [
            'todo-list/static/src/js/**/*'
        ]
    },
    'installable': True,
    'application': True,
    'auto_install': False
}