/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import { VisualFormattingSettingsModel } from "./settings";

export class Visual implements IVisual {
    private target: HTMLElement;
    private updateCount: number;
    private Title;
    private BU;
    private TOP_1;
    private TOP_2;
    private TOP_3;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;

    constructor(options: VisualConstructorOptions) {
        // console.log('Visual constructor', options);
        this.formattingSettingsService = new FormattingSettingsService();
        this.target = options.element;
    }

    public update(options: VisualUpdateOptions) {
        this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(VisualFormattingSettingsModel, options.dataViews[0]);

        console.log('Visual update', options.dataViews[0].categorical.values);
        if (options.dataViews[0].categorical.values.length == 4) {
            this.Title = options.dataViews[0].categorical.values[0].values[0]   
            this.BU = options.dataViews[0].categorical.values[1].values[0]   
            this.TOP_1 = options.dataViews[0].categorical.values[2].values[0]   
            this.TOP_2 = options.dataViews[0].categorical.values[3].values[0]   
            this.TOP_3 = options.dataViews[0].categorical.values[4].values[0]  
            if (document) {

                let isBlack = 'black';

                if (this.BU == null) {
                    isBlack = 'none';
                }

                let html = '<div class="container" style="display: ' + isBlack + '">'+
                                '<div class="title"><div class="icon"></div>' + this.Title + '</div>'+
                                '<div class="subtitle">'+ this.BU +'</div>'+
                                '<div class="team">' + this.TOP_1 + '</div>'+
                                '<div class="team">' + this.TOP_2 + '</div>'+
                                '<div class="team">' + this.TOP_3 + '</div>'+
                            '</div>';
                
                this.target.innerHTML = html;
            }          
        }
    }

    /**
     * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
     * This method is called once every time we open properties pane or when the user edit any format property. 
     */
    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
}