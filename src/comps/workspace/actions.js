export const Action = {
  default: '',
  empty: 'empty',
  refresh: 'refresh',
  reload: 'reload',

  request_save: 'request-save',
  request_delete: 'request-delete',
  request_revert: 'request-revert',
  request_print: 'request_print',

  request_edit: 'request-edit',
  request_add_new: 'request-add-new',
}

export const WorkspaceAction = {
  empty: '',

  add: 'add',
  edit: 'edit',
  delete: 'remove',

  save: 'save',
  revert: 'revert',
  refresh: 'refresh',

  print: 'print'
}

export const WorkspaceMode = {
  default: '',
  custom: '',

  selected: 'selected',
  view: 'view',
  add_new: 'add_new',
  edit: 'edit',
}