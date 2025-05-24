from odoo import models, fields, api

class TodoList(models.Model):
    _name = "todolist"
    _description = "TodoList"
    
    completed = fields.Boolean(string="Is Completed")
    name = fields.Char(string="Task Name")
    color = fields.Char(string="Color")