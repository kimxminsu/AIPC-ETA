Ext.define('TSB.ux.panel.ResponsivePanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.tsb-responsivepanel',
	
    minHeight: 100,
    hideCollapseTool: true,
    cls: ['custom-responsivepanel-text'],
    ui: 'light',
    collapsible: true,
    collapsed: true,
    titleCollapse: true,
    titleAlign:'left',
});