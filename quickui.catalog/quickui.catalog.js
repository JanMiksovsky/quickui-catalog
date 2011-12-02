//
// AdPlaceholder
//
AdPlaceholder = Control.subclass({
    name: "AdPlaceholder",
    content: [
        " ",
        {
            html: "<div />",
            id: "container",
            content: [
                " ",
                {
                    html: "<div>Advertisement</div>",
                    id: "label"
                },
                " ",
                {
                    html: "<div />",
                    id: "AdPlaceholder_content"
                },
                " "
            ]
        },
        " "
    ]
});
AdPlaceholder.prototype.extend({

    initialize: function() {
        this.genericIfClassIs( AdPlaceholder );
        
        if ( !this.dimensions() ) {
            // Use default size.
            this.dimensions( "300 x 250" );
        }
    },
    
    /*
     * The content of the ad unit. By default this shows the unit/dimensions.
     */
    content: Control.chain( "$AdPlaceholder_content", "content" ),
    
    /*
     * The dimensions of the ad unit. Should include two values separated
     * by an "x", e.g., "300 x 250". Can also be one of the following
     * ad unit names:
     * 
     *      Medium Rectangle
     *      Rectangle
     *      Leaderboard
     *      Wide Skyscraper
     *      Half Page Ad
     *      Button 2
     *      Micro Bar
     */
    dimensions: Control.property( function( dimensions ) {
        
        var s = AdPlaceholder.standardUnits[ dimensions ] || dimensions;
        var parts = s.toLowerCase().split( "x" );
        var width = parseInt( parts[0] );
        var height = parseInt( parts[1] );
        
        this.$container().css({
                height: height,
                "min-height": height,
                "min-width": width,
                width: width
        });
        this
            .content( width + " x " + height )
            .trigger( "sizeChanged" );
            
    })
    
});

// Class methods
AdPlaceholder.extend({
    
    /*
     * Names of all core standard ad units as of 2/28/2011.
     * See http://www.iab.net/iab_products_and_industry_services/1421/1443/1452
     */
    standardUnits: {
        "Medium Rectangle": "300 x 250",
        "Rectangle": "180 x 150",
        "Leaderboard": "728 x 90",
        "Wide Skyscraper": "160 x 600",
        "Half Page Ad": "300 x 600",
        "Button 2": "120 x 60",
        "Micro Bar": "88 x 31"
    }
});

//
// AutoSizeTextBox
//
AutoSizeTextBox = Control.subclass({
    name: "AutoSizeTextBox",
    content: [
        " ",
        {
            html: "<textarea />",
            id: "textBox"
        },
        " ",
        {
            html: "<pre />",
            id: "textCopy"
        },
        " "
    ]
});
AutoSizeTextBox.prototype.extend({
    
    initialize: function() {
        
        var self = this;
        this.$textBox().bind({
            "change keyup": function( event ) {
                self.autoSize();
            },
            keypress: function( event ) {
                if ( event.which === 13 /* Enter */ ) {
                    // Speculatively add a line to our copy of the text.
                    /*
                     * We're not sure what the exact effect of typing this
                     * character will be, and at this point it's not reflected
                     * yet in the text box's content. We speculate that it
                     * will add a line to the text and size accordingly.
                     * (One other possibility is that the user's replacing
                     * a selected chunk of text with a newline.) In any event,
                     * once we get the keyup or change event, we'll make any
                     * final adjustments.
                     */
                    self.autoSize( true );
                }
            }
        });
        
        this.inDocument( function( $control  ) {
            $control._refresh();
        });
    },

    /*
     * Resize the text box to exactly contain its content.
     * 
     * We do this by copying the text box contents to the hidden copy.
     * That copy will size appropriately, which will make the overall control
     * the right height, which will then size the text box.
     */
    autoSize: Control.iterator( function( addExtraLine ) {
        
        var content = this.$textBox().content();
        
        if ( addExtraLine ) {
            content += "\n";
        }
        
        // See if last line of content ends in a newline (extra or otherwise).
        if ( content.slice( -1 ) === "\n" ) {
            // Add an extra space so that the last line will get fully rendered.
            content += " "; 
        }
        
        this.$textCopy().text( content );
    }),
    
    content: Control.chain( "$textBox", "content", function() {
        this.autoSize();
    }),
    
    /*
     * The minimum number of lines that should be shown.
     * The default value of 2 creates a textarea at least two lines
     * tall, which helps the user intuit the ability to type multiple
     * lines of text.
     */
    minimumLines: Control.property.integer( function( minimumLines ) {
        if ( this.inDocument() ) {
            this._refresh();
        }
    }, 2 ),
    
    // For the following, we need to wait until the control's in the DOM.    
    _refresh: Control.iterator( function() {

        var $textBox = this.$textBox();
        var $textCopy = this.$textCopy();
        
        // Copy the control's font to the textarea and text copy.
        // This ensures both end up with the same text metrics.
        this.children().css({
            "font-family": this.css( "font-family" ),
            "font-size": this.css( "font-size" ),
            "font-style": this.css( "font-style" ),
            "font-weight": this.css( "font-weight" )
        });

        // Try to get the text box's line height. Unfortunately some browsers
        // return the useful value "normal", in which case we have to make
        // an estimate based on font size.
        var lineHeight = parseInt( $textBox.css( "line-height" ) );
        if ( isNaN( lineHeight ) ) {
            // line-height values like "normal" don't give us a measurement
            // we can use. We fall back to estimating a line height
            // based on font size. We then apply this to both the text box
            // and the copy so they both have the same font-size.
            lineHeight = Math.floor( parseInt( $textBox.css( "font-size" ) ) * 1.25 );
            $textBox.css( "line-height", lineHeight + "px" );
        } 
        $textCopy.css( "line-height", lineHeight + "px" );
        
        // Mirror the textarea's padding and borders on the text copy.
        // NOTE: Firefox seems to report 0px padding for the text box, even when there
        // appears to be 1px padding on a standard textarea. WebKit gets this right.
        // Perhaps there's some way in Firefox to detect and correct the error, but
        // for the time being this seems to work okay.
        var borderBottomWidth = $textBox.css( "border-bottom-width" );
        var borderLeftWidth = $textBox.css( "border-left-width" );
        var borderRigthWidth = $textBox.css( "border-right-width" );
        var borderTopWidth = $textBox.css( "border-top-width" );
        var paddingBottom = $textBox.css( "padding-bottom" );
        var paddingLeft = $textBox.css( "padding-left" );
        var paddingRight = $textBox.css( "padding-right" );
        var paddingTop = $textBox.css( "padding-top" );
        $textCopy.css({
            "border-bottom-width": borderBottomWidth,
            "border-left-width": borderLeftWidth,
            "border-right-width": borderRigthWidth,
            "border-top-width": borderTopWidth,  
            "padding-bottom": paddingBottom,  
            "padding-left": paddingLeft,
            "padding-right": paddingRight,
            "padding-top": paddingTop
        });

        var minimumLines = this.minimumLines();
        if ( minimumLines ) {
            
            // Convert the number of lines into a minimum height.
            var height = minimumLines * lineHeight;
            
            // Mozilla incorrectly includes padding+border in height when
            // -moz-box-sizing is border-box. The other browsers do not,
            // so for those browsers we need to add it in.
            if ( !$.browser.mozilla ) {
                height += parseInt( borderTopWidth )
                        + parseInt( paddingTop )
                        + parseInt( paddingBottom )
                        + parseInt( borderBottomWidth );
            }
            
            this.$textCopy().css( "min-height", height + "px" );
        }
    })
    
});

//
// CalendarDay
//
CalendarDay = Control.subclass({
    name: "CalendarDay"
});
CalendarDay.prototype.extend({
    
    alternateMonth: Control.chain( "applyClass/alternateMonth" ),
    firstDayOfMonth: Control.chain( "applyClass/firstDayOfMonth" ),
    firstWeek: Control.chain( "applyClass/firstWeek" ),
    future: Control.chain( "applyClass/future" ),
    lastDayOfMonth: Control.chain( "applyClass/lastDayOfMonth" ),
    past: Control.chain( "applyClass/past" ),
    saturday: Control.chain( "applyClass/saturday" ),
    sunday: Control.chain( "applyClass/sunday" ),
    today: Control.chain( "applyClass/today" ),
    weekday: Control.chain( "applyClass/weekday" ),
    
    initialize: function() {
        
        this._super();
        this.genericIfClassIs( CalendarDay );
        
        var self = this;
        this.click( function( event ) {
            self.trigger( "dateSelected", [ self.date() ] );
        });
        
        if ( !this.date() ) {
            this.date( CalendarDay.today() );
        }
    },

    date: Control.property.date( function( date ) {
        
        var today = CalendarDay.today();
        var dayOfWeek = date.getDay();
        var dayOfMonth = date.getDate();
        var nextDate = CalendarDay.addDays( date, 1 );
        var daysFromToday = Math.round( (date.getTime() - today.getTime()) / CalendarDay.MILLISECONDS_IN_DAY );
        
        this
            .past( date < today )
            .future( date > today )
            .firstDayOfMonth( dayOfMonth === 1 )
            .lastDayOfMonth( date.getMonth() !== nextDate.getMonth() )
            .firstWeek( dayOfMonth <= 7 )
            .sunday( dayOfWeek === 0 )
            .saturday( dayOfWeek === 6 )
            .weekday( dayOfWeek > 0 && dayOfWeek < 6 )
            .today( daysFromToday === 0 )
            .alternateMonth( Math.abs( date.getMonth() - today.getMonth()) % 2 === 1 )
            .content( date.getDate() );
    })
    
});


// Class methods. These are general date utilities.
CalendarDay.extend({

    MILLISECONDS_IN_DAY: 24 * 60 * 60 * 1000,

    // Return the result of adding the specified number of days to the given date.
    addDays: function( date, days ) {
        
        // Use noon hour for date math, since adding/subtracting multiples of 24 hours
        // starting from noon is guaranteed to end up on the correct date (although
        // the hours might have changed).
        var noon = new Date( date.getTime() );
        noon.setHours( 11 );
        var result = new Date( noon.getTime() + (days * this.MILLISECONDS_IN_DAY) );
        
        // Restore original hours
        result.setHours( date.getHours() );
        return result;
    },
    
    midnightOnDate: function( date ) {
        var d = new Date( date.getTime() );
        d.setHours( 0 );
        d.setMinutes( 0 );
        d.setSeconds( 0 );
        d.setMilliseconds( 0 );
        return d;
    },
    
    today: function() {
        return this.midnightOnDate( new Date() );
    }

});

//
// CalendarDayButton
//
CalendarDayButton = CalendarDay.subclass({
    name: "CalendarDayButton",
    content: [
        " ",
        {
            control: "ButtonBase",
            id: "button",
            generic: "false"
        },
        " "
    ]
});
CalendarDayButton.prototype.extend({
    
    content: Control.chain( "$button", "content" ),
    
    initialize: function() {
        this._super();
        this.genericIfClassIs( CalendarDayButton );
    }
});

//
// CalendarMonth
//
CalendarMonth = Control.subclass({
    name: "CalendarMonth",
    content: [
        " ",
        {
            control: "CalendarWeek"
        },
        " ",
        {
            control: "CalendarWeek"
        },
        " ",
        {
            control: "CalendarWeek"
        },
        " ",
        {
            control: "CalendarWeek"
        },
        " ",
        {
            control: "CalendarWeek"
        },
        " ",
        {
            control: "CalendarWeek"
        },
        " "
    ]
});
CalendarMonth.prototype.extend({

    dayClass: Control.chain( "$weeks", "dayClass", function() { this._refresh(); } ),
    $days: Control.chain( "find/.CalendarDay", "control" ),
    $weeks: Control.chain( "children", "control" ),
    
    initialize: function() {
        
        this.genericIfClassIs( CalendarMonth );
        
        if ( !this.date() ) {
            // By default, show current month.
            this.date( CalendarDay.today() );
        }
    },
    
    culture: function( culture ) {
        var result = this._super( culture );
        if ( culture !== undefined ) {
            this.$weeks().culture( culture );
            this._refresh();
        }
        return result;
    },

    // The date that will be included in this month (could be any day of the month)
    date: Control.property( function() {
        this
            ._refresh()
            .trigger( "dateChanged", [ this.date() ] );
    }),

    // Return the day control for the given date.
    dayControlForDate: function( date ) {
        return this.weekControlForDate( date ).dayControlForDate( date );
    },
    
    // Return the week control for the given date.
    // TODO: Return null if date is not within this month.
    weekControlForDate: function( date ) {
        var dayOMonth = date.getDate();
        var weeksWithDate = this.map( function( index, month ) {
            var $weeks = $( month ).control().$weeks();
            var firstDayOfMonth = new Date( date.getTime() );
            firstDayOfMonth.setDate(1);
            var offset = $weeks.daysSinceFirstDayOfWeek( firstDayOfMonth );
            var week = Math.floor( ( date.getDate() + offset - 1 ) / 7 );
            return $weeks[ week ];
        });
        var $weeksWithDate = $().add( weeksWithDate ).control();
        return $weeksWithDate;
    },
    
    _refresh: function() {

        // Use midnight on the given date as a reference point.
        var firstDayOfMonth = CalendarDay.midnightOnDate( this.date() );
        firstDayOfMonth.setDate(1);
        
        // Get last day of month by going to first day of next month and backing up a day.
        var lastDayOfMonth = new Date( firstDayOfMonth.getTime() );
        lastDayOfMonth.setMonth( lastDayOfMonth.getMonth() + 1 );
        lastDayOfMonth.setDate( lastDayOfMonth.getDate() - 1);
        
        // Fill in the weeks.
        var month = firstDayOfMonth.getMonth();
        this.$weeks().eachControl( function( weekRow, $week) {

            $week.date( CalendarDay.addDays( firstDayOfMonth, 7 * weekRow ) );
            
            // Hide weeks completely in another month (i.e., the next month).
            // Apply "hidden" class to preserve week's original "display" property.
            var $days = $week.$days();
            var firstDayOfWeek = $days.eq(0).date();
            var lastDayOfWeek = $days.eq(6).date();
            var isWeekInMonth = ( firstDayOfWeek.getMonth() === month || lastDayOfWeek.getMonth() === month );
            $week.toggleClass( "hidden", !isWeekInMonth );
        });
        
        // Paint days inside and outside range.
        this.$days().eachControl( function( index, $day ) {
            var date = $day.date();
            var insideMonth = date
                ? ( date >= firstDayOfMonth && date <= lastDayOfMonth )
                : false;
            $day
                .toggleClass( "insideMonth", insideMonth )
                .toggleClass( "outsideMonth", !insideMonth );

        });
        
        return this;
    }
    
});

//
// CalendarMonthWithHeadings
//
CalendarMonthWithHeadings = Control.subclass({
    name: "CalendarMonthWithHeadings",
    content: [
        " ",
        {
            control: "MonthName",
            id: "monthName"
        },
        " ",
        {
            html: "<div />",
            id: "monthTable",
            content: [
                " ",
                {
                    control: "DaysOfWeek",
                    id: "daysOfWeek",
                    format: "namesShort"
                },
                " ",
                {
                    control: "CalendarMonth",
                    id: "calendar"
                },
                " "
            ]
        },
        " "
    ]
});
CalendarMonthWithHeadings.prototype.extend({
    
    $days: Control.chain( "$calendar", "$days" ),
    dayClass: Control.chain( "$calendar", "dayClass" ),
    dayNameFormat: Control.chain( "$daysOfWeek", "format" ),
    showMonthName: Control.chain( "$monthName", "visibility" ),
    
    initialize: function() {
        
        this.genericIfClassIs( CalendarMonthWithHeadings );
        
        if ( !this.date() ) {
            // By default, show current month.
            this.date( CalendarDay.today() );
        }
    },
    
    culture: function( culture ) {
        var result = this._super( culture );
        if ( culture !== undefined ) {
            this.$monthName().culture( culture );
            this.$daysOfWeek().culture( culture );
            this.$calendar().culture( culture );
            var date = this.date();
            if ( date ) {
                this.date( date );
            }
        }
        return result;
    },
    
    /* The date shown in the calendar */
    date: Control.chain( "$calendar", "date", function( date ) {
        this.$monthName().month( date.getMonth() );
    }),
    
    dayControlForDate: function( date ) {
        return this.$calendar().dayControlForDate( date );
    }
    
});

//
// CalendarWeek
//
CalendarWeek = Control.subclass({
    name: "CalendarWeek",
    content: [
        " ",
        {
            control: "CalendarDay"
        },
        " ",
        {
            control: "CalendarDay"
        },
        " ",
        {
            control: "CalendarDay"
        },
        " ",
        {
            control: "CalendarDay"
        },
        " ",
        {
            control: "CalendarDay"
        },
        " ",
        {
            control: "CalendarDay"
        },
        " ",
        {
            control: "CalendarDay"
        },
        " "
    ]
});
CalendarWeek.prototype.extend({
    
    /* The date that will be included in this week (could be any day of the week) */
    date: Control.property( function() { this._refresh(); }),

    /* The collection of day cells */
    $days: Control.chain( "children", "control" ),
    
    /* The class of each day cell */
    dayClass: Control.chain( "$days", "transmute", function() { this._refresh(); } ),
    
    initialize: function() {
        if ( !this.date() ) {
            // Default date range is the current week.
            this.date( CalendarDay.today() );
        }
    },
    
    culture: function( culture ) {
        var result = this._super( culture );
        if ( culture !== undefined ) {
            this._refresh();
        }
        return result;
    },

    // Return the day control for the given date.
    // TODO: Return null if date is not within this week.
    dayControlForDate: function( date ) {
        var days = this.map( function( index, week ) {
            var $week = $( week ).control();
            var dayIndex = $week.daysSinceFirstDayOfWeek( date );
            return $week.$days()[ dayIndex ];
        });
        var $days = $().add( days ).control();
        return $days;
    },
    
    daysSinceFirstDayOfWeek: function( date ) {
        var firstDayOfWeek = this.firstDayOfWeek();
        return ( date.getDay() - firstDayOfWeek + 7 ) % 7;
    },
    
    // Return the index of the "first day of the week" in the current culture.
    // In English, this is 0 (Sunday), but in many places its 1 (Monday).
    firstDayOfWeek: function() {
        var culture = this.culture();
        return culture ? culture.calendar.firstDay : 0;
    },
    
    /*
     * Set the dates on all controls in the week.
     */
    _refresh: function() {

        // Use midnight on the given date as a reference point.
        date = CalendarDay.midnightOnDate( this.date() );

        // Get the first day of the week containing this date (e.g., Sunday).
        var dateStart = CalendarDay.addDays( date, -this.daysSinceFirstDayOfWeek( date ) );
        
        // Fill in the date range.
        this.$days().eachControl( function( index, $day) {
            $day.date( CalendarDay.addDays( dateStart, index ) );
        });
    }
    
});

//
// Collapsible
//
Collapsible = Control.subclass({
    name: "Collapsible",
    content: [
        " ",
        {
            html: "<div />",
            id: "Collapsible_heading"
        },
        " ",
        {
            html: "<div />",
            id: "Collapsible_content"
        },
        " "
    ]
});
Collapsible.prototype.extend({
    
    /*
     * The control's contents which can be expanded and collapsed.
     */
    content: Control.chain( "$Collapsible_content", "content" ),
    
    /*
     * The speed of the expand/collapse animation, in milliseconds.
     */
    duration: Control.property( null, "fast" ),
    
    /*
     * Get or set the control's collapsed state.
     * When called as a setter, a true value collapsed the control;
     * a false value expands the control.
     */
	collapsed: function( value ) {
	    if ( value === undefined )
	    {
	        // Getter
	        return this._collapsed();
	    } else {
	        
	        // Setter
            var result = value ? "hide" : "show";
            this.$Collapsible_content().animate(
                { 
                    height: result,
                    opacity: result
                },
                this.duration()
            );
            
            if ( this._collapsed() !== value ) {
                this.trigger( "collapsedChanged" );
                this._collapsed( value );
            }
            
            return this;
	    }
	},
    
    /*
     * The control's heading. By default, a click anywhere within the heading
     * toggles the control's collapsed state.
     * 
     * This can be empty if the application wants to programmatically control
     * the collapsed state in some other means.
     */
    heading: Control.chain( "$Collapsible_heading", "content" ),
    
    initialize: function() {
        
        this._super();
        this.genericIfClassIs( Collapsible );
        
        var self = this;
        this.click( function() {
            if ( self.toggleOnClick() ) {
                self.toggleCollapse();
            }
        });
    },
	
	toggleCollapse: function()
	{
		this.collapsed( !this.collapsed() );
	},
	
    toggleOnClick: Control.property.bool( null, true ),
    
    _collapsed: Control.property.bool( null, false )

});

//
// ColorSwatch
//
ColorSwatch = Control.subclass({
    name: "ColorSwatch"
});
ColorSwatch.prototype.extend({
    
    color: function( color ) {
        if ( color === undefined ) {
            return this.css( "background-color" );
        } else {
            
            this
                .css( "background-color", "white" ) // Apply white first
                .css( "background-color", color );  // Apply new color
        
            /* Validate the color value. */
            var colorValid;
            if ( color === "" || color === null ) {
                colorValid = false;
            } else if ( color === "white" || color === "rgb(255, 255, 255)" ) {
                // White color values are known to be good.
                colorValid = true;
            } else {
                // See if the new value "stuck", or is still white.
                var colorValue = this.css( "background-color" );
                colorValid = !( colorValue === "white" || colorValue === "rgb(255, 255, 255)" );
            }
            return this.toggleClass( "none", !colorValid );
        }
    }
    
});

//
// ColorSwatchButton
//
ColorSwatchButton = ButtonBase.subclass({
    name: "ColorSwatchButton",
    content: [
        " ",
        {
            control: "ColorSwatch",
            id: "swatch"
        },
        {
            html: "<div />",
            id: "ColorSwatchButton_content"
        },
        " "
    ]
});
ColorSwatchButton.prototype.extend({

    initialize: function() {
        this.genericIfClassIs( ColorSwatchButton );
    },
    
    color: Control.chain( "$swatch", "color" ),
    
    content: Control.chain( "$ColorSwatchButton_content", "content", function( content ) {
        this.$swatch().color( content );
    })
    
});

//
// ColorSwatchTextBox
//
ColorSwatchTextBox = Control.subclass({
    name: "ColorSwatchTextBox",
    content: [
        " ",
        {
            control: "ColorSwatch",
            id: "swatch"
        },
        {
            html: "<input type=\"text\" />",
            id: "ColorSwatchTextBox_content"
        },
        " "
    ]
});
ColorSwatchTextBox.prototype.extend({
    
    initialize: function() {
        var self = this;
        this.keyup( function() {
            self._refresh();
        });
    },
    
    content: Control.chain( "$ColorSwatchTextBox_content", "content", function( content ) {
        this._refresh();
    }),
    
    _refresh: function() {
        this.$swatch().color( this.content() );
    }
    
});

//
// DateComboBox
//
DateComboBox = ComboBox.subclass({
    name: "DateComboBox",
    textBoxClass: "DateTextBox",
    popup: [
        " ",
        {
            control: "CalendarMonthNavigator",
            id: "navigator"
        },
        " "
    ]
});
DateComboBox.prototype.extend({
    
    navigatorClass: Control.chain( "$navigator", "transmute" ),
    required: Control.chain( "$ComboBox_content", "required" ),
    
    initialize: function() {
        
        this._super();
        this.genericIfClassIs( DateComboBox );
        
        // Sync up dates
        this.date( this.$navigator().date() );

        // Changing text updates navigator, and vice versa.
        var self = this;
        this.bind({
            "dateChanged": function( event, date ) {
                self.date( date );
            },
            "dateSelected": function( event, date ) {
                self.date( date );
                self.close();
            }
        });
    },
    
    /*
     * Keep dates in text box and navigator in sync.
     */
    date: Control.property( function( date ) {
        
        var time = date && date.getTime();
        
        var textBoxDate = this.$ComboBox_content().date();
        if ( !textBoxDate || textBoxDate.getTime() !== time ) {
            this.$ComboBox_content().date( date );
        }
        
        // Navigator can only handle non-null dates.
        if ( date ) {
            var navigatorDate = this.$navigator().date();
            if ( !navigatorDate || navigatorDate.getTime() !== time ) {
                this.$navigator().date( date );
            }
        }
    })

});

//
// DaysOfWeek
//
DaysOfWeek = Control.subclass({
    name: "DaysOfWeek",
    content: " <div class=\"dayOfWeek\" /> <div class=\"dayOfWeek\" /> <div class=\"dayOfWeek\" /> <div class=\"dayOfWeek\" /> <div class=\"dayOfWeek\" /> <div class=\"dayOfWeek\" /> <div class=\"dayOfWeek\" /> "
});
DaysOfWeek.prototype.extend({
    
    initialize: function() {
        this.genericIfClassIs( DaysOfWeek );
        if ( !this.format() ) {
            this.format( "namesAbbr" );
        }
    },
    
    culture: function( culture ) {
        var result = this._super( culture );
        if ( culture !== undefined ) {
            this.format( this.format() );
        }
        return result;
    },

    /*
     * Uses the day name formats defined by Globalize:
     * names (e.g., "Sunday"), namesAbbreviated ("Sun"), namesShort ("Su")
     */
    format: Control.property( function( format ) {
        
        var culture = this.culture();
        var dayNameEnum = culture ? culture.calendar.days : DaysOfWeek.days;
        var dayNames = dayNameEnum[ format ];
        
        var firstDay = culture ? culture.calendar.firstDay : 0;
        
        var $children = this.children();
        for ( var i = 0; i < dayNames.length; i++ ) {
            var day = (i + firstDay) % 7;
            var dayName = dayNames[ day ];
            $children.eq(i).content( dayName );
        }
    })
    
});

DaysOfWeek.extend({
    
    // Default names; used if Globalize is not loaded.
    days: {
        // full day names
        names: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
        
        // abbreviated day names
        namesAbbr: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
        
        // shortest day names
        namesShort: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]
    }
    
})

//
// Fader
//
Fader = Control.subclass({
    name: "Fader",
    content: [
        " ",
        {
            html: "<div />",
            id: "Fader_content"
        },
        " ",
        {
            control: "Gradient",
            id: "gradient",
            direction: "horizontal"
        },
        " "
    ]
});
Control.prototype.extend({
    
});

Fader.prototype.extend({
    
    content: Control.chain( "$Fader_content", "content" ),
    
    initialize: function() {
        this.inDocument( function( $control ) {
            $control._redraw();
        });
    },
    
    direction: Control.property( function( direction ) {
        this
            .toggleClass( "vertical", direction !== "horizontal" )
            ._redraw()
            .$gradient()
                .direction(direction);
    }),
    
    // Expand a color like #abc into #aabbcc.
    _expandShortHexValue: function( s ) {
        var shortHex = s.slice( 1 ); // Remove "#"
        var longHex = "";
        for ( var i = 0; i < shortHex.length; i++ ) {
            var c = shortHex[i];
            longHex += c + c;
        }
        return "#" + longHex;
    },

    _hexByte: function( n ) {
        var s = ( new Number( n & 0xFF ) ).toString( 16 );
        if ( s.length === 1 )
        {
            s = "0" + s;
        }
        return s;
    },
    
    _redraw: Control.iterator( function() {
        var backgroundColor = this.css("background-color");
        var backgroundHex = ( backgroundColor.length === 4 )
            ? this._expandShortHexValue( backgroundColor ) 
            : ( backgroundColor.substr( 0, 3 ).toLowerCase() === "rgb" )
                ? this._rgbStringToHexColor( backgroundColor )
                : backgroundColor;
        this.$gradient()
            .start( backgroundHex + "00" )
            .end( backgroundHex );
    }),
    
    _rgbStringToHexColor: function( rgbString ) {
        rgb = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#"
            + this._hexByte( rgb[1] )
            + this._hexByte( rgb[2] )
            + this._hexByte( rgb[3] );
    }
    
});

//
// FlickrInterestingnessDay
//
FlickrInterestingnessDay = CalendarDay.subclass({
    name: "FlickrInterestingnessDay",
    content: [
        " ",
        {
            html: "<div />",
            id: "FlickrInterestingnessDay_content"
        },
        " ",
        {
            html: "<a />",
            id: "link",
            content: [
                " ",
                {
                    html: "<img />",
                    id: "image"
                },
                " "
            ]
        },
        " "
    ]
});
FlickrInterestingnessDay.prototype.extend({

    content: Control.chain( "$FlickrInterestingnessDay_content", "content" ),
    href: Control.chain( "$link", "attr/href" ),
    image: Control.chain( "$image", "attr/src" ),
    
    initialize: function() {
        if ( !this.date() ) {
            // Default day is *yesterday* (since we need a date in the past).
            var date = CalendarDay.today();
            date.setDate( date.getDate() - 1 );
            this.date( date );
        }
    },
    
    autoLoad: Control.property.bool( function( autoLoad ) {
        if ( autoLoad && this.image() == null ) {
            this.loadPhoto();
        }
    }),
    
    date: function( date ) {
        var result = this._super( date );
        if ( date !== undefined ) {
            this
                .image( null )
                .href( null );
            if ( this.autoLoad() ) {
                this.loadPhoto();
            }
        }
        return result;
    },
    
    loadPhoto: Control.iterator( function() {
        var date = this.date();
        // Flickr only has a photo for dates entirely in the past (not for today).
        if ( date && date < CalendarDay.today() ) {
            
            var self = this;
            FlickrInterestingnessDay.getInterestingPhotoForDate( date, function( photo ) {
                // Double-check we got a photo, and also check that the date
                // hasn't been changed since the photo was requested.
                if ( photo && date === self.date() ) {
                    self.image( photo.src );
                }
            });
            
            // Clicking the day navigates to list of the day's interesting photos.
            var baseUrl = "http://www.flickr.com/explore/interesting/";
            var url = baseUrl
                + date.getFullYear() + "/"
                + ( date.getMonth() + 1 ) + "/"
                + date.getDate();
            this.href( url );
        }
    })

});

// Class methods
FlickrInterestingnessDay.extend({
    
    // Please replace with your own API key.
    _flickrApiKey: "c3685bc8d8cefcc1d25949e4c528cbb0",
    
    // Cache of photos already loaded, indexed by Flickr-style date string. 
    _cache: {},
    
    getInterestingPhotoForDate: function( date, callback ) {
        
        var flickrDate = this._formatFlickrDate( date );
        var cachedPhoto = this._cache[ flickrDate ];
        if ( cachedPhoto ) {
            callback( cachedPhoto );
            return;
        }
        
        var params = {
            method: "flickr.interestingness.getList",
            date: flickrDate,
            per_page: 1
        };
        var self = this;
        this.getFlickrPhotos( params, function( flickrPhotos ) {
            if ( flickrPhotos && flickrPhotos.length > 0 ) {
                var first = flickrPhotos[0];
                var photo = {
                    src: self.getFlickrImageSrc( first, "s" /* Small thumbnail */ ),
                    href: self.getFlickrImageHref( first )
                };
                self._cache[ flickrDate ] = photo;
                callback( photo );
            }
        });
    },
    
    getFlickrPhotos: function( params, callback ) {

        var baseUrl = "http://api.flickr.com/services/rest/";
        
        // Note: JSONP in jQuery usually calls for callback=?, but the Flickr
        // API wants jsoncallback=?. Thankfully, jQuery supports that.
        var url = baseUrl
                    + "?api_key=" + this._flickrApiKey
                    + this._formatUrlParams( params )
                    + "&format=json"
                    + "&jsoncallback=?";

        $.getJSON( url )
            .success( function( data ) {
                if ( data && data.photos ) {
                    callback( data.photos.photo );
                }
            });
    },
    
    getFlickrImageSrc: function( flickrPhoto, size ) {
        var sizeParam = ( size ? "_" + size : "" );
        return "http://farm" + flickrPhoto.farm +
               ".static.flickr.com/" + flickrPhoto.server +
               "/" + flickrPhoto.id +
               "_" + flickrPhoto.secret +
               sizeParam +
               ".jpg";
    },
    
    getFlickrImageHref: function(flickrPhoto) {
        return "http://flickr.com/photo.gne?id=" + flickrPhoto.id;
    },
    
    // Return a date in YYYY-MM-DD format.
    _formatFlickrDate: function( date ) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var s = year + "-" +
                ( ( month < 10 ) ? "0" : "" ) + month + "-" +
                ( ( day < 10 ) ? "0" : "" ) + day;
        return s;
    },
    
    // Convert the given params dictionary into a string that can be
    // passed on a URL.
    _formatUrlParams: function( params ) {
        var s = "";
        $.each( params, function( key, value ) {
            s += "&" + key + "=" + value;
        });
        return s;
    }

});

//
// FlickrInterestingPhoto
//
FlickrInterestingPhoto = Control.subclass({
    name: "FlickrInterestingPhoto",
    tag: "img"});
FlickrInterestingPhoto.prototype.extend({
    
    initialize: function() {
        this.reload();
    },
    
    reload: function() {
        var self = this;
        FlickrInterestingPhoto.getRandomPhoto( function( photo ) {
            self.prop( "src", photo );
        });
    }
    
});

// Class methods
FlickrInterestingPhoto.extend({
    
    getRandomPhoto: function( callback ) {
        var self = this;
        this.getFlickrInterestingPhotos( function( flickrPhotos ) {
            self._counter = ( self._counter >= 0 )
                ? ( self._counter + 1 ) % flickrPhotos.length 
                : 0;
            var flickrPhoto = flickrPhotos[ self._counter ];
            var photo = self.getFlickrImageSrc( flickrPhoto );
            callback( photo );
        });
    },
    
    getFlickrInterestingPhotos: function( callback ) {
        
        if ( this._flickrPhotos ) {
            callback( this._flickrPhotos );
            return;
        }
        
        var yesterday = new Date();
        yesterday.setDate( yesterday.getDate() - 1 );
        var flickrDate = this._formatFlickrDate( yesterday );
        
        var params = {
            method: "flickr.interestingness.getList",
            date: flickrDate,
            per_page: 100
        };

        var self = this;
        this.getFlickrPhotos( params, function( flickrPhotos ) {
            self._flickrPhotos = flickrPhotos;
            callback( self._flickrPhotos );
            //var photo = {
            //    src: self.getFlickrImageSrc( first, "s" /* Small thumbnail */ ),
            //    href: self.getFlickrImageHref( first )
            //};
        });
    },
    
    getFlickrPhotos: function( params, callback ) {
        var apiKey = "c3685bc8d8cefcc1d25949e4c528cbb0";
        var baseUrl = "http://api.flickr.com/services/rest/";
        var url = baseUrl + 
                    "?api_key=" + apiKey +
                    this._formatUrlParams( params ) +
                    "&format=json" +
                    "&nojsoncallback=1";
        $.getJSON( url, function( data ) {
            if ( data && data.photos ) {
                callback( data.photos.photo );
            }
        });
    },
    
    getFlickrImageSrc: function( flickrPhoto, size ) {
        var sizeParam = ( size ? "_" + size : "" );
        return "http://farm" + flickrPhoto.farm +
               ".static.flickr.com/" + flickrPhoto.server +
               "/" + flickrPhoto.id +
               "_" + flickrPhoto.secret +
               sizeParam +
               ".jpg";
    },
    
    getFlickrImageHref: function(flickrPhoto) {
        return "http://flickr.com/photo.gne?id=" + flickrPhoto.id;
    },
    
    // Return a date in YYYY-MM-DD format.
    _formatFlickrDate: function( date ) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var s = year + "-" +
                ( ( month < 10 ) ? "0" : "" ) + month + "-" +
                ( ( day < 10 ) ? "0" : "" ) + day;
        return s;
    },
    
    // Convert the given params dictionary into a string that can be
    // passed on a URL.
    _formatUrlParams: function( params ) {
        var s = "";
        $.each( params, function( key, value ) {
            s += "&" + key + "=" + value;
        });
        return s;
    }

});

//
// Gradient
//
Gradient = Control.subclass({
    name: "Gradient"
});
Gradient.prototype.extend({
    
    end: Control.property(function() { this._redraw(); }),
    direction: Control.property(function() { this._redraw(); }, "vertical"),
    start: Control.property(function() { this._redraw(); }),
    
    initialize: function() {
        this._redraw();
    },
    
    _redraw: function() {
        var direction = this.direction();
        var start = this.start();
        var end = this.end();
        if (direction && start && end)
        {
            var horizontal = (direction === "horizontal");
            var startColorString = this._hexColorToRgbString(start);
            var endColorString = this._hexColorToRgbString(end);
            var property;
            var value;
            if ($.browser.mozilla)
            {
                property = "background-image";
                var position = horizontal ? "left" : "top";
                value = "-moz-linear-gradient(" + position + ", " + startColorString + ", " + endColorString + ")";
            }
            else if ($.browser.webkit)
            {
                property = "background-image"; 
                var position2 = horizontal ? "right top" : "left bottom";
                value = "-webkit-gradient(linear, left top, " + position2 + ", from(" + startColorString + "), to(" + endColorString + "))";
            }
            else if ($.browser.msie)
            {
                property = "filter";
                var gradientType = horizontal ? 1 : 0;
                value = "progid:DXImageTransform.Microsoft.gradient(gradientType=" + gradientType + ", startColorStr=" + startColorString + ", endColorStr=" + endColorString + ")"; 
            }

            this.css(property, value);
        }
    },
    
    /* Convert a hex color like #00ff00 to "rgb(0, 255, 0)" */
    _hexColorToRgbString: function(hex) {
        
        if (hex.substr(0, 1) == "#")
        {
            // Remove "#"
            hex = hex.substring(1);
        }
        var hasAlpha = (hex.length == 8);
        var color = parseInt(hex, 16);
        var a;
        
        var rgbString;
        if ($.browser.msie)
        {
            // Internet Explorer
            rgbString = hex;
            if (hasAlpha)
            {
                // Move alpha to front, from RGBA to ARGB.
                a = rgbString.slice(6);
                rgbString = a + rgbString.substr(0, 6);
            }
            rgbString = "#" + rgbString; 
        }
        else
        {
            // WebKit, Mozilla
            var colorStringType = hasAlpha ? "rgba" : "rgb";
            var alphaString = "";
            if (hasAlpha)
            {
                // Convert alpha from hex to decimal.
                a = (color & 0xFF) / 255;
                alphaString = "," + a;
                color = color >> 8;
            }
            
            var r = (color >> 16) & 0xFF;
            var g = (color >> 8)  & 0xFF;
            var b = color         & 0xFF;
            
            rgbString = colorStringType + "(" + r + "," + g + "," + b + alphaString + ")";
        }
        
        return rgbString;
    }
    
});

//
// HighlightEffects
//
HighlightEffects = Control.subclass({
    name: "HighlightEffects",
    content: [
        " ",
        {
            html: "<div />",
            id: "HighlightEffects_content"
        },
        " "
    ]
});
HighlightEffects.prototype.extend({
    
    _originalState: Control.property(),
    
    /*
     * The control's content.
     */
    content: Control.chain( "$HighlightEffects_content", "content", function() {
        if ( this.inDocument() ) {
            this._recalc();
        }
    }),
    
    /*
     * The speed with which animations are applied.
     * 
     * This uses a faster default than $.animate(), since hover animations
     * should generally respond quickly.
     * 
     * Set this to 0 to have effects applied instantaneously.
     */
    duration: Control.property( null, 100 ),
    
    /*
     * The effects that will be applied on hover.
     */
    effects: Control.property( function() {
        this._originalState( this._getCurrentState() );
    }),
    
    initialize: function() {
        
        this.genericIfClassIs( HighlightEffects );

        var self = this;
        this
            .bind( "sizeChanged", function() {
                self._recalc();
            })
            .hover(
                function() { self._hoverIn(); },
                function() { self._hoverOut(); }
            )
            .inDocument( function( $control ) {
                $control
                    ._originalState( $control._getCurrentState() )
                    ._recalc();
            });
    },

    /*
     * Get the current values of all CSS attributes which will be overwritten
     * by the effects. This snapshot is used on hover out to restore the
     * original state.
     */
    _getCurrentState: function() {
        var currentState = {};
        var $content = this.$HighlightEffects_content();
        var effects = this.effects();
        for ( var key in effects ) {
            var value;
            switch ( key ) {

                /*
                 * When border properties are applied, they may get split up
                 * into border-<side> properties, leaving the overall border
                 * properties empty. So, use the properties of one of the
                 * border sides as a proxy for the overall border properties.
                 */
                case "border-color":
                    value = $content.css( "border-top-color" );
                    break;
                case "border-width":
                    value = $content.css( "border-top-width" );
                    break;
                
                /*
                 * Map dimensions of "auto" to "0" so that the dimension can
                 * be animated. 
                 */
                case "bottom":
                case "left":
                case "right":
                case "top":
                    value = $content.css( key );
                    if ( value === "auto" ) {
                        value = "0";
                    }
                    break;
                    
                default:
                    value = $content.css( key );
                    break;
            }
            currentState[ key ] = value;
        }
        return currentState;
    },

    _hoverIn: function() {
        this.$HighlightEffects_content()
            .stop() // In case this was doing its _hoverOut animation
            .css({
                "position": "absolute",
                "z-index": "2"  // In front of any element doing _hoverOut
            })
            .animate( this.effects(), this.duration() );
    },
    
    _hoverOut: function() {
        var savedState = this._originalState() || {};
        this.$HighlightEffects_content()
            .stop() // In case this was doing its _hoverIn animation
            .css({
                // Show in front of peer elements, but behind _hoverIn element.
                "z-index": "1" 
            })
            .animate( savedState, this.duration(), null, function() {
                // Restore normal positioning when animation completes.
                $( this ).css({
                    "position": "inherit",
                    "z-index": "inherit"
                });
            });
    },
    
    /*
     * Update the control's size to match the contents. This lets us
     * apply absolute positioning to the contents on hover while still
     * preserving room for the content in the normal document flow.
     */
    _recalc: function() {
        this.height( this.$HighlightEffects_content().outerHeight() );
        this.width( this.$HighlightEffects_content().outerWidth() );
    }
    
});

//
// HintTextBox
//
HintTextBox = Control.subclass({
    name: "HintTextBox",
    content: [
        " ",
        {
            html: "<input type=\"text\" />",
            id: "HintTextBox_textBox"
        },
        " ",
        {
            html: "<div />",
            id: "HintTextBox_hint"
        },
        " "
    ]
});
HintTextBox.prototype.extend({
    
    content: Control.chain("$HintTextBox_textBox", "content", function() {
        this._showHintIfEmpty();
    }),
    hint: Control.chain("$HintTextBox_hint", "content"),
    
    initialize: function() {
        var self = this;
        this.bind({
            "click": function() { self._hideHint(); },
            "focus": function() {
                if (!self._isTextBoxFocused())
                {
                    self.$HintTextBox_textBox().focus();
                }
            }
        });
        this.$HintTextBox_textBox().bind({
            "blur": function() {
                self
                    ._isTextBoxFocused(false)
                    ._showHintIfEmpty();
            },
            "keydown keyup": function() { self._showHintIfEmpty(); },
            "focus": function() { self._isTextBoxFocused(true); }
        });
        this.$HintTextBox_hint().click(function() {
            self._hideHint();
        });
    },
    
    _isTextBoxFocused: Control.property(null, false),
    
    _hideHint: function() {
        this.$HintTextBox_hint().hide(); 
        this.$HintTextBox_textBox().focus();
    },
    
    _showHintIfEmpty: function() {
        this.$HintTextBox_hint().toggle(this.content().length == 0);
    }
    
});

//
// LateralNavigator
//
LateralNavigator = Control.subclass({
    name: "LateralNavigator",
    content: [
        " ",
        {
            html: "<div />",
            id: "header",
            content: [
                " ",
                {
                    control: "HorizontalPanels",
                    left: [
                        " ",
                        {
                            control: "ButtonBase",
                            id: "LateralNavigator_previousButton",
                            "class": "navigatorButton",
                            generic: "false",
                            content: "◀"
                        },
                        " "
                    ],
                    content: [
                        " ",
                        {
                            html: "<div />",
                            id: "LateralNavigator_heading"
                        },
                        " "
                    ],
                    right: [
                        " ",
                        {
                            control: "ButtonBase",
                            id: "LateralNavigator_nextButton",
                            "class": "navigatorButton",
                            generic: "false",
                            content: "▶"
                        },
                        " "
                    ]
                },
                " "
            ]
        },
        " ",
        {
            html: "<div />",
            id: "LateralNavigator_content"
        },
        " "
    ]
});
LateralNavigator.prototype.extend({

    content: Control.chain( "$LateralNavigator_content", "content" ),
    nextButtonContent: Control.chain( "$LateralNavigator_nextButton", "content" ),
    nextButtonDisabled: Control.chain( "$LateralNavigator_nextButton", "disabled" ),
    previousButtonContent: Control.chain( "$LateralNavigator_previousButton", "content" ),
    previousButtonDisabled: Control.chain( "$LateralNavigator_previousButton", "disabled" ),
    heading: Control.chain( "$LateralNavigator_heading", "content" ),

    initialize: function() {

        this.genericIfClassIs( LateralNavigator );

        var self = this;
        this.$LateralNavigator_previousButton().click( function() {
            self.previous();
        });
        this.$LateralNavigator_nextButton().click( function() {
            self.next();
        });
    },
    
    // Use generic buttons if control itself is generic.
    generic: function( generic ) {
        var result = this._super( generic );
        if ( generic !== undefined ) {
            this.find( ".navigatorButton" ).control().generic( generic );
        }
        return result;
    },
    
    /* Subclasses should override these */
    next: function() {},
    previous: function() {}
});

//
// ListBox
//
ListBox = List.subclass({
    name: "ListBox",
    itemClass: "ButtonBase"
});
ListBox.prototype.extend({
    
    initialize: function() {
        
        this._super();
        this.genericIfClassIs( ListBox );
        
        /*
         * Try to convince the browser that the list is focusable, but without
         * forcing it into the tab order (as a positive tabindex would do).
         * Firefox, Chrome, and IE seem to handle this as desired if tabindex
         * is set to a negative number.
         */
        this.attr( "tabindex", "-1" );
        
        var self = this;
        this.on("click", function( event ) {
                var control = self._getControlContainingElement( event.target );
                if ( control ) {
                    self._controlClick( control );
                }
            })
            .on("keydown", function( event ) {
                self._keydown( event );
            });
    },
    
    /*
     * The control in the list which is currently selected.
     */
    selectedControl: Control.iterator( function( selectedControl ) {
        if ( selectedControl === undefined ) {
            var control = this.controls().filter( ".selected" ).eq(0);
            return control.length > 0
                ? control
                : null;
        } else {
            var previousControl = this.selectedControl();
            this.controls()
                .removeClass( "selected" )
                .filter( selectedControl )
                .addClass( "selected" );
            if ( selectedControl ) {
                this._scrollToControl( selectedControl );
            }
            if ( selectedControl !== previousControl ) {
                this.trigger( "selectionChanged" );
            }
        }
    }),
    
    /*
     * The index of the currently-selected control.
     */
    selectedIndex: Control.iterator( function( selectedIndex ) {
        if ( selectedIndex === undefined ) {
            var control = this.selectedControl();
            return control
                ? this.controls().index( control )
                : -1;
        } else {
            var index = parseInt( selectedIndex );
            var control = ( index >= 0 )
                ? this.controls().eq( index )
                : null;
            this.selectedControl( control );
        }
    }),
    
    /*
     * The item represented by the currently-selected control.
     */
    selectedItem: Control.iterator( function( selectedItem ) {
        if ( selectedItem === undefined ) {
            var index = this.selectedIndex();
            return index >= 0
                ? this.items()[ index ]
                : null;
        } else {
            var index = $.inArray( selectedItem, this.items() );
            this.selectedIndex( index );
        }
    }),
    
    _controlClick: function( control ) {
        this.selectedControl( control );
    },
    
    _getControlContainingElement: function( element ) {
        return $( element ).closest( this.controls() ).control();
    },
    
    /*
     * Return the control that spans the given y position, or -1 if not found.
     * If downward is true, move down the list of controls to find the
     * first control found at the given y position; if downward is false,
     * move up the list of controls to find the last control at that position. 
     */
    _getControlAtY: function( y, downward ) {
        
        var controls = this.controls();
        var start = downward ? 0 : controls.length - 1;
        var end = downward ? controls.length : 0;
        var step = downward ? 1 : -1;
        for ( var i = start; i !== end; i += step ) {
            var $control = controls.eq(i);
            var controlTop = Math.round( $control.offset().top );
            var controlBottom = controlTop + $control.outerHeight();
            if ( controlTop <= y && controlBottom >= y ) {
                return i;
            }
        }
        
        return -1;
    },
    
    /*
     * Handle a keydown event.
     */
    _keydown: function( event ) {
        
        var handled;
        switch ( event.which ) {

            case 33: // Page Up
                handled = this._pageUp();
                break;
                
            case 34: // Page Down
                handled = this._pageDown();
                break;
            
            case 35: // End
                handled = this._selectLastControl();
                break;
            
            case 36: // Home
                handled = this._selectFirstControl();
                break;
            
            case 38: // Up
                handled = event.altKey
                    ? this._selectFirstControl()
                    : this._selectPreviousControl();
                break;
                
            case 40: // Down
                handled = event.altKey
                    ? this._selectLastControl()
                    : this._selectNextControl();
                break;
                
            default:
                handled = false;
                break;
        }
        
        if (handled)
        {
            event.stopPropagation();
            event.preventDefault();
        }
    },
    
    _pageDown: function() {
        return this._scrollOnePage( true );
    },
    
    _pageUp: function() {
        return this._scrollOnePage( false );
    },
    
    /*
     * Move by one page downward (if downward is true), or upward (if false).
     */
    _scrollOnePage: function( downward ) {

        var selectedIndex = this.selectedIndex();
        
        // Find the control at the bottom/top edge of the viewport.
        var viewPortDimensions = this._viewPortDimensions();
        var edge = downward ? viewPortDimensions.bottom : viewPortDimensions.top;
        var index = this._getControlAtY( edge, downward );
        
        if ( index >= 0 && selectedIndex === index ) {
            // The control at that edge is already selected.
            // Move one page further down/up.
            var delta = downward
                ? viewPortDimensions.height
                : -viewPortDimensions.height; 
            index = this._getControlAtY( edge + delta, downward );
        }

        if ( index < 0 ) {
            // Would have scrolled too far in that direction.
            // Just select the last/first control.
            index = downward
                ? this.controls().length - 1
                : 0;
        }
        
        if ( index !== this.selectedIndex() ) {
            this.selectedIndex( index );
            return true;
        }
        
        return false;
    },
    
    /*
     * Scroll the given control into view.
     */
    _scrollToControl: function( $control ) {
        
        var controlTop = $control.offset().top;
        var controlBottom = controlTop + $control.outerHeight();

        var viewPortDimensions = this._viewPortDimensions();
        var scrollTop = this.scrollTop();
        
        if ( controlBottom > viewPortDimensions.bottom ) {
            // Scroll up until control is entirely visible.
            this.scrollTop( scrollTop + controlBottom - viewPortDimensions.bottom );
        } else if ( controlTop < viewPortDimensions.top ) {
            // Scroll down until control is entirely visible.
            this.scrollTop( scrollTop - ( viewPortDimensions.top - controlTop ) );
        }
    },
    
    _selectFirstControl: function() {
        if ( this.controls().length > 0 ) {
            this.selectedIndex( 0 );
            return true;
        }
        return false;
    },
    
    _selectLastControl: function() {
        if ( this.controls().length > 0 ) {
            this.selectedIndex( this.controls().length - 1 );
            return true;
        }
        return false;
    },
    
    _selectNextControl: function() {
        var index = this.selectedIndex() + 1;
        if ( index < this.controls().length ) {
            this.selectedIndex( index );
            return true;
        }
        return false;
    },
    
    _selectPreviousControl: function() {
        var index = this.selectedIndex() - 1;
        if ( index >= 0 && this.controls().length > 0 ) {
            this.selectedIndex( index );
            return true;
        }
        return false;
    },
    
    _viewPortDimensions: function() {
        var viewPortTop = this.offset().top;
        var viewPortHeight = this.height();
        return {
            top: viewPortTop,
            height: viewPortHeight,
            bottom: viewPortTop + viewPortHeight
        };
    }
    
});

//
// ListComboBox
//
ListComboBox = ComboBox.subclass({
    name: "ListComboBox",
    popup: [
        " ",
        {
            control: "ListBox",
            id: "list"
        },
        " "
    ]
});
ListComboBox.prototype.extend({
    
    _itemContents: Control.property(),
    items: Control.chain( "$list", "items", function() { this._updateItemContents(); } ),
    mapFunction: Control.chain( "$list", "mapFunction" ),
    _timeout: Control.property(),
    
    initialize: function() {
        
        this._super();
        this.genericIfClassIs( ListComboBox );
        
        // Clicking an item in the list puts its content into the text box portion.
        var self = this;
        this.$list().on({
            
                click: function( event ) {
                    var $closestItem = $( event.target ).closest( self.$list().children() );
                    if ( $closestItem ) {
                        var itemContent = $closestItem.control().content();
                        self
                            .content( itemContent )
                            .close();
                    }
                },
                
                keydown: function( event ) {
                    if ( event.which === 13 /* Enter */) {
                        if ( self.opened() ) {
                            self.close();
                            event.stopPropagation();
                            event.preventDefault();
                        }
                    }
                },
                
                selectionChanged: function() {
                    var selectedControl = self.$list().selectedControl();
                    if ( selectedControl ) {
                        var content = selectedControl.content();
                        if ( content !== self.content() ) {
                            self.content( content );
                            self._selectText( 0, content.length );
                        }
                    }
                }
                
            });
        
        if ( !this.itemClass() ) {
             this.itemClass( ButtonBase );
        }
    },
    
    // Instead of chaining, make this a property so we can check for a default
    // value of undefined.
    itemClass: Control.property[ "class" ]( function( itemClass ) {
        this.$list().itemClass( itemClass );
    }),
    
    open: function() {

        // See if current text is in the list and, if so, select it.
        var content = this.content();
        var index = $.inArray( content, this._itemContents() );
        if ( index >= 0 ) {
            this.$list().selectedIndex( index );
        }
        
        var result = this._super();
        
        // Give the input control focus if it doesn't already have it.
        var inputControl = this.inputControl();
        if ( document.activeElement !== inputControl[0] ) {
            this.inputControl().focus();
        }
        
        return result;
    },
    
    // Try to auto-complete the current text against the item contents.
    _autoComplete: function() {
        
        var content = this.content();
        // console.log( content );
        
        var match = this._matchingItem( content );
        if ( !match ) {
            this.$list().selectedControl( null );
            return;
        }

        this.content( match );
        
        // Select the auto-completed text.
        this._selectText( content.length, match.length );
        
        this._selectTextInList();
    },
    
    _bindContentEvents: function() {
        
        this._super();
        
        // See notes at _contentKeydown.
        var self = this;
        this.inputControl().keydown( function( event ) {
            self._contentKeydown( event );
        });
    },
    
    /*
     * Handle a keydown event. Keydown gives the best AutoComplete performance
     * and behavior: among other things, the AutoComplete happens as soon as
     * the user begins typing. However, using keydown creates a problem that
     * the input control's content won't actually reflect the effects key the
     * user just pressed down. So we set a timeout to give the keydown event a
     * chance to bubble up and do its work, then do our AutoComplete work
     * against the resulting text.
     */
    _contentKeydown: function( event ) {
        
        var handled = false;
        var navigationKeys = [
            33, // Page Up
            34, // Page Down
            38, // Up
            40 // Down
        ];
        var self = this;
        
        // Do AutoComplete on Space, or characters from zero (0) and up,
        // ignoring any combinations that involve Alt or Ctrl.
        if ( ( event.which === 32 || event.which >= 48 ) 
            && !( event.altKey || event.ctrlKey || event.metaKey) ) {

            this._setTimeout( function() { self._autoComplete(); });
            
        } else if ( this.opened() && $.inArray( event.which, navigationKeys ) >= 0 ) {
            
            // Forward navigation keys to opened list.
            this.$list().trigger( event );
            handled = true;

        } else if ( event.which === 8 || event.which === 46 ) {
            
            // On Backspace or Delete, clear list select if text is empty.
            this._setTimeout( function() {
                self._selectTextInList();
            });
            
        } else if ( event.which === 40 ) {
            
            // Pressing Down when list is closed will open list.
            this.open();
            
            // If the input text is empty, select the first list item.
            var content = this.content();
            if ( content == null || content.length === 0 ) {
                this.$list().selectedIndex( 0 );
            }

            handled = true;
            
        }
        
        if ( handled ) {
            event.stopPropagation();
            event.preventDefault();
        }
    },

    // Return the item whose prefix matches the given string, ignoring case.
    // Return null if not found.
    _matchingItem: function( s ) {
        var length = s.length;
        if ( length > 0 ) {
            var lower = s.toLowerCase();
            var itemContents = this._itemContents();
            for ( var i = 0, itemCount = itemContents.length; i < itemCount; i++ ) {
                var itemContent = itemContents[i]; 
                if ( length <= itemContent.length
                    && itemContent.substr( 0, length ).toLowerCase() === lower ) {
                    return itemContent;
                }
            }
        }
        return null;
    },

    // Select the current input text in the list if it's there.
    // Clear the list selection if the text is not found.
    _selectTextInList: function() {
        if ( this.opened() ) {
            var content = this.content();
            var index = $.inArray( content, this._itemContents() );
            this.$list().selectedIndex( index );
        }
    },
    
    // Arrange for a callback to be performed via a timeout.
    // See notes at _contentKeydown.
    _setTimeout: function( callback ) {
        
        // Cancel any pending AutoComplete timeout.
        var timeout = this._timeout();
        if ( timeout ) {
            clearTimeout( timeout );
        }
        
        // Queue a new timeout.
        var self = this;
        timeout = window.setTimeout( callback, 50 );
        this._timeout( timeout );
    },
    
    /*
     * Extract a copy of all the items so we can match against them when
     * the user types. We get the contents from the list's controls, rather
     * than from the list's items() property, since the items could be
     * arbitrary JavaScript objects. Once the list's mapFunction has mapped
     * those objects into the controls, the controls' content should best
     * reflect the text to map against. 
     */
    _updateItemContents: function() {
        var itemContents = [];
        this.$list().controls().eachControl( function( index, $control ) {
            itemContents.push( $control.content() );
        });
        this._itemContents( itemContents );
    }

});

//
// LoremIpsum
//
LoremIpsum = Control.subclass({
    name: "LoremIpsum"
});
LoremIpsum.prototype.extend({
    
    initialize: function() {
        if ( !this.paragraphs() ) {
            this.paragraphs( 1 );
        }
    },
    
    /*
     * The number of paragraphs to show. Default is one paragraph.
     */
    paragraphs: Control.property.integer( function( count ) {
        
        var content = [];
        for ( var i = 0; i < count; i++ ) {
            
            var paragraph = this._generateParagraph();
            
            if ( i === 0 ) {
                // First paragraph starts with special lead.
                paragraph = LoremIpsum.leadSentence + " " + paragraph;
            }
            
            content.push( "<p>" + paragraph + "</p>" );
        }
        
        this.content( content );
    }),

    /*
     * Generate a random paragraph.
     */    
    _generateParagraph: function() {
        
        // Between 5 and 12 sentences per paragraph.
        var count = Math.floor( Math.random() * 8 ) + 5;
        var sentencesAvailable = LoremIpsum.sentences.length;
        
        var paragraph = "";
        for ( var i = 0; i < count; i++ ) {
            if ( paragraph.length > 0 ) {
                paragraph += " ";
            }
            var sentenceIndex = Math.floor( Math.random() * ( sentencesAvailable) );
            var sentence = LoremIpsum.sentences[ sentenceIndex ];
            paragraph += sentence;
        }
        
        return paragraph;
    }
    
});

// Class members
LoremIpsum.extend({
    
    leadSentence: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
    
    sentences: [
        "Duis et adipiscing mi.",
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        "Mauris vestibulum orci sed justo lobortis viverra.",
        "Suspendisse blandit dolor nunc, nec facilisis metus.",
        "Ut vestibulum ornare eros id vestibulum.",
        "Phasellus aliquam pellentesque urna, eu ullamcorper odio sollicitudin vel.",
        "Aliquam lacinia dolor at elit viverra ullamcorper.",
        "Vestibulum ac quam augue.",
        "Fusce tortor risus, commodo in molestie vitae, rutrum eu metus.",
        "Nunc tellus justo, consequat in ultrices elementum, gravida a mi.",
        "Praesent in lorem erat, quis dictum magna.",
        "Aenean et eros ligula, quis sodales justo.",
        "Quisque egestas imperdiet dignissim.",
        "Aenean commodo nulla sit amet urna ornare quis dignissim libero tristique.",
        "Praesent non justo metus.",
        "Nam ut adipiscing enim.",
        "In hac habitasse platea dictumst.",
        "Nulla et enim sit amet leo laoreet lacinia ut molestie magna.",
        "Vestibulum bibendum venenatis eros sit amet eleifend.",
        "Fusce eget metus orci.",
        "Fusce tincidunt laoreet lacinia.",
        "Proin a arcu purus, nec semper quam.",
        "Mauris viverra vestibulum sagittis.",
        "Ut commodo, dolor malesuada aliquet lacinia, dui est congue massa, vel sagittis metus quam vel elit.",
        "Nulla vel condimentum odio.",
        "Aliquam cursus velit ut tellus ultrices rutrum.",
        "Vivamus sollicitudin rhoncus purus, luctus lobortis dui viverra vitae.",
        "Nam mauris elit, aliquet at congue sed, volutpat feugiat eros.",
        "Nulla quis nulla ac lectus dapibus viverra.",
        "Pellentesque commodo mauris vitae sapien molestie sit amet pharetra quam pretium.",
        "Maecenas scelerisque rhoncus risus, in pharetra dui euismod ac.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Mauris ut turpis sapien, sed molestie odio.",
        "Vivamus nec lectus nunc, vel ultricies felis.",
        "Mauris iaculis rhoncus dictum.",
        "Vivamus at mi tellus.",
        "Etiam nec dui eu risus placerat adipiscing non at nisl.",
        "Curabitur commodo nunc accumsan purus hendrerit mollis.",
        "Fusce lacinia urna nec eros consequat sed tempus mi rhoncus.",
        "Morbi eu tortor sit amet tortor elementum dapibus.",
        "Suspendisse tincidunt lorem quis urna sollicitudin lobortis.",
        "Nam eu ante ut tellus vulputate ultrices eu sed mi.",
        "Aliquam lobortis ultricies urna, in imperdiet lacus tempus a.",
        "Duis nec velit eros, ut volutpat neque.",
        "Sed quam purus, tempus vitae porta eget, porta sit amet eros.",
        "Vestibulum dignissim ullamcorper est id molestie.",
        "Nunc erat ante, lobortis id dictum in, ultrices sit amet nisl.",
        "Nunc blandit pellentesque sapien, quis egestas risus auctor quis.",
        "Fusce quam quam, ultrices quis convallis sed, pulvinar auctor tellus.",
        "Etiam dolor velit, hendrerit et auctor sit amet, ornare nec erat.",
        "Nam tellus mi, rutrum a pretium et, dignissim sed sapien.",
        "Sed accumsan dapibus ipsum ut facilisis.",
        "Curabitur vel diam massa, ut ultrices est.",
        "Sed nec nunc arcu.",
        "Nullam lobortis, enim nec gravida molestie, orci risus blandit orci, et suscipit nunc odio eget nisl.",
        "Praesent lectus tellus, gravida ut sagittis non, convallis a leo.",
        "Mauris tempus feugiat fermentum.",
        "Phasellus nibh mi, convallis eu pulvinar eget, posuere in nunc.",
        "Morbi volutpat laoreet mauris vel porta.",
        "Aenean vel venenatis nisi.",
        "Ut tristique mauris sed libero malesuada quis rhoncus augue convallis.",
        "Fusce pellentesque turpis arcu.",
        "Nunc bibendum, odio id faucibus malesuada, diam leo congue urna, sed sodales orci turpis id sem.",
        "Ut convallis fringilla dapibus.",
        "Ut quis orci magna.",
        "Mauris nec erat massa, vitae pellentesque tortor.",
        "Sed in ipsum nec enim feugiat aliquam et id arcu.",
        "Nunc ut massa sit amet nisl semper ultrices eu id lacus.",
        "Integer eleifend aliquam interdum.",
        "Cras a sapien sapien.",
        "Duis non orci lacus.",
        "Integer commodo pharetra nulla eget ultrices.",
        "Etiam congue, enim at vehicula posuere, urna lorem hendrerit erat, id condimentum quam lectus ac ipsum.",
        "Aliquam lorem purus, tempor ac mollis in, varius eget metus.",
        "Nam faucibus accumsan sapien vitae ultrices.",
        "Morbi justo velit, bibendum non porta vel, tristique quis odio.",
        "In id neque augue.",
        "Cras interdum felis sed dui ultricies laoreet sit amet eu elit.",
        "Vestibulum condimentum arcu in massa lobortis vitae blandit neque mattis.",
        "Nulla imperdiet luctus mollis.",
        "Donec eget lorem ipsum, eu posuere mi.",
        "Duis lorem est, iaculis sit amet molestie a, tincidunt rutrum magna.",
        "Integer facilisis suscipit tortor, id facilisis urna dictum et.",
        "Suspendisse potenti.",
        "Aenean et mollis arcu.",
        "Nullam at nulla risus, vitae fermentum nisl.",
        "Nunc faucibus porta volutpat.",
        "Sed pretium semper libero, vitae luctus erat lacinia vel.",
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        "Integer facilisis tempus tellus, rhoncus pretium orci semper sed.",
        "Morbi non lectus leo, quis semper diam.",
        "Suspendisse ac urna massa, vitae egestas metus.",
        "Pellentesque viverra mattis semper.",
        "Cras tristique bibendum leo, laoreet ultrices urna condimentum at.",
        "Praesent at tincidunt velit.",
        "Nam fringilla nibh quis nulla volutpat lacinia.",
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        "Sed ultrices sollicitudin neque ut molestie.",
        "Sed at lectus in lacus scelerisque suscipit non id risus.",
        "Aliquam lorem nibh, convallis vitae molestie in, commodo feugiat nibh."
    ]
})

//
// MonthName
//
MonthName = Control.subclass({
    name: "MonthName",
    tag: "span"});
MonthName.prototype.extend({
    
    initialize: function() {
        if ( !this.month() ) {
            var today = new Date();
            this.month( today.getMonth() );
        }
    },

    culture: function( culture ) {
        var result = this._super( culture );
        if ( culture !== undefined ) {
            this.month( this.month() );
        }
        return result;
    },
    
    month: Control.property( function( month ) {
        var culture = this.culture();
        var monthNameEnum = culture ? culture.calendar.months.names : MonthName.names;
        this.content( monthNameEnum[ month ] );
    })
    
});

// Class methods
MonthName.extend({
    
    // Default names, used if Globalize is not avaialble.
    names: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    
});

//
// MultiListBox
//
MultiListBox = ListBox.subclass({
    name: "MultiListBox"
});
MultiListBox.prototype.extend({

    initialize: function() {
        this._super();
        this.genericIfClassIs( MultiListBox );
    },
    
    /*
     * The controls in the list which are currently selected.
     */
    selectedControls: Control.iterator( function( selectedControls ) {
        if ( selectedControls === undefined ) {
            return this.controls().filter( ".selected" );
        } else {
            this.controls()
                .removeClass( "selected" )
                .filter( selectedControls )
                .addClass( "selected" );
            this.trigger( "selectionChanged" );
        }
    }),
    
    /*
     * The indices of the currently-selected controls.
     */
    selectedIndices: Control.iterator( function( selectedIndices ) {
        var controls = this.controls();
        if ( selectedIndices === undefined ) {
            var indices = [];
            for ( var i = 0; i < controls.length; i++ ) {
                if ( controls.eq(i).hasClass( "selected" ) ) {
                    indices.push( i );
                }
            }
            return indices;
        } else {
            var selectedControls = [];
            if ( selectedIndices ) {
                for ( var i = 0; i < selectedIndices.length; i++ ) {
                    var index = selectedIndices[i];
                    selectedControls.push( controls[ index ] );
                }
            }
            this.selectedControls( selectedControls );
        }
    }),
    
    /*
     * The items represented by the currently-selected controls.
     */
    selectedItems: Control.iterator( function( selectedItems ) {
        if ( selectedItems === undefined ) {
            var indices = this.selectedIndices();
            var items = this.items();
            var selectedItems = [];
            for ( var i = 0; i < indices.length; i++ ) {
                var index = indices[i];
                selectedItems.push( items[i] );
            }
            return selectedItems;
        } else {
            var selectedControls = [];
            if ( selectedItems ) {
                var controls = this.controls();
                var items = this.items();
                for ( var i = 0; i < selectedItems.length; i++ ) {
                    var item = selectedItems[i];
                    var index = $.inArray( item, items );
                    if ( index >= 0 ) {
                        selectedControls.push( controls[ index ] );
                    }
                }
            }
            this.selectedControls( selectedControls );
        }
    }),
    
    /*
     * Toggle the selected state of the given control (if toggle is undefined),
     * or set the selected state to the indicated toggle value.
     */
    toggleControl: function( control, toggle ) {
        $( control ).toggleClass( "selected", toggle );
        this.trigger( "selectionChanged" );
        return this;
    },
    
    _controlClick: function( control ) {
        this.toggleControl( control );
    }

});

//
// PanelWithOverflow
//
PanelWithOverflow = Layout.subclass({
    name: "PanelWithOverflow",
    content: [
        " ",
        {
            control: "HasPopup",
            id: "menuButton",
            closeOnInsideClick: "true",
            openOnClick: "true",
            content: [
                " ",
                {
                    control: "ButtonBase",
                    id: "PanelWithOverflow_indicator",
                    content: "»"
                },
                " "
            ]
        },
        " ",
        {
            html: "<div />",
            id: "PanelWithOverflow_content"
        },
        " "
    ]
});
PanelWithOverflow.prototype.extend({
    
    /*
     * The contents of the control.
     */
    content: Control.chain( "$PanelWithOverflow_content", "content", function() {
        this.layout();
    }),
    
    /*
     * The indicator used to show when contents have overflowed
     * the contorl's bounds.
     */
    indicator: Control.chain( "$PanelWithOverflow_indicator", "content", function() {
        this.layout();
    }),
    
    initialize: function() {
        
        this._super();
        this.genericIfClassIs( PanelWithOverflow );
        
        var self = this;
        this.$menuButton().on({
            "canceled closed": function() { self._menuClosed(); },
            "opened": function() { self._menuOpened(); }
        });
    },
    
    /*
     * Force the control to layout its contents.
     */
    layout: Control.iterator( function() {
        
        // Don't bother laying out until we're visible, or if the popup
        // is currently open. The latter case, while it'd be nice to support,
        // quickly gets quite hairy.
        if ( !this.is( ":visible" ) || this.$menuButton().opened() ) {
            return;
        }
        
        var availableWidth = this.width();
        var showMenu = false;
        var $children = this.$PanelWithOverflow_content().children();
        
        // Work from right to left 
        for ( var i = $children.length - 1; i > 0; i-- ) {
            var $child = $children.eq(i);
            // Look at right edge, not counting right margin
            var marginLeft = parseInt( $child.css( "margin-left" ) ) || 0;
            var right = marginLeft + $child.position().left + $child.outerWidth();
            var overflowed = ( right > availableWidth );
            $child.toggleClass( "overflowed", overflowed );
            if ( overflowed ) {
                if ( !showMenu ) {
                    // Turn on menu, and allocate room for it.
                    showMenu = true;
                    availableWidth -= this.$menuButton().outerWidth( true );
                }
            } else {
                // Everything to the left fits.
                $children.slice( 0, i ).removeClass( "overflowed" );
                break;
            }
        }
        
        this.$menuButton().toggle( showMenu );
    }),
    
    _menuClosed: Control.iterator( function() {
        // Return the overflow menu's children to the main content area.
        var $overflowed = this.$menuButton().popup();
        this.$PanelWithOverflow_content().append( $overflowed );
        this.layout();
    }),
    
    _menuOpened: Control.iterator( function() {
        // Temporarily move the overflowed items into the menu.
        var content = this.$PanelWithOverflow_content().content();
        var $overflowed = $( content ).filter( ".overflowed" );
        this.$menuButton().popup( $overflowed );
    })

});

//
// PersistentPanel
//
PersistentPanel = Control.subclass({
    name: "PersistentPanel",
    content: [
        " ",
        {
            html: "<div />",
            id: "PersistentPanel_content"
        },
        " "
    ]
});
PersistentPanel.prototype.extend({

    /*
     * The content's background. See top notes.
     */    
    background: Control.chain( "$PersistentPanel_content", "css/background" ),
    
    /*
     * The control's content.
     */
    content: Control.chain( "$PersistentPanel_content", "content", function() {
        this.trigger( "sizeChanged" );
    }),
    
    /*
     * True if the control is currently docked to the top of the viewport.
     */
    docked: Control.chain( "applyClass/docked" ),
    
    /*
     * The content's padding. See top notes.
     */
    padding: Control.chain( "$PersistentPanel_content", "css/padding" ),
    
    initialize: function() {
        
        this.genericIfClassIs( PersistentPanel );
        
        var self = this;
        this
            .bind( "sizeChanged", function() {
                if ( self.inDocument() ) {
                    self._recalc();
                }
            })
            .inDocument( function( $control ) {
                if ( !$control.scrollingParent() ) {
                    // No scrolling parent has been set; look for one.
                    $control.scrollingParent( $control._findScrollingParent() );
                }
                $control._recalc();
            });

        $( window ).resize( function() {
            self._recalc();
        });
    },
    
    /*
     * The parent of this control used to determine whether the control is
     * in or out of view. The default value for this property is the closest
     * parent element with overflow-y set to "auto" or "scroll".
     */
    scrollingParent: Control.property( function( scrollingParent ) {
        var self = this;
        $( scrollingParent ).scroll( function() {
            self._recalc();
        });
    }),

    _adjustSizes: function() {
        
        // Make the panel the same width as the container.
        this.$PersistentPanel_content().width( this.width() );
        
        // Make the container the same height as the panel, so that when
        // the panel pops out in fixed mode, the container can continue
        // to occupy the same amount of vertical space.
        this.height( this.$PersistentPanel_content().outerHeight( true ) );
    },
    
    /*
     * Determine which parent of the control scrolls vertically.
     */
    _findScrollingParent: function() {
        
        // By default, assume the window is what is scrolling.
        var scrollingParent = window;
        
        var parents = this.parents();
        for ( var i = 0; i < parents.length; i++ ) {
            
            if ( parents[i] === document.body ) {
                /*
                 * It doesn't appear possible to bind to the scroll event
                 * for the document body. Instead, if the body is the
                 * scrolling parent, we use the window instead, which has
                 * the same effect.
                 */
                break;
            }
            
            var overflowY = parents.eq(i).css( "overflow-y" );
            if ( overflowY === "auto" || overflowY === "scroll" ) {
                // Found a parent that explicitly asks for scrolling; use that.
                scrollingParent = parents[i];
                break;
            }
        }
        
        return scrollingParent;
    },

    /*
     * Do the real work of the control: determine whether the panel contents
     * should flow with the document, or pop out into a docked position at the
     * top or bottom of the viewport.
     */
    _recalc: function() {
        var scrollingParent = this.scrollingParent();
        if ( scrollingParent ) {
            
            var isScrollingParentWindow = ( scrollingParent === window );
            var $scrollingParent = $( scrollingParent );
            
            var scrollTop = $scrollingParent.scrollTop();
            var containerTop = this.position().top;
            var aboveViewPort = ( containerTop < scrollTop );

            var scrollBottom = scrollTop + $scrollingParent.height();
            var containerBottom = containerTop + this.height();
            var belowViewPort = ( containerBottom > scrollBottom );
            
            var dock = ( aboveViewPort || belowViewPort );

            if ( dock ) {
                /*
                 * Docking the content puts it outside the normal document.
                 * The control (the outer container) will collapse in size,
                 * which we don't want to happen -- anything below the control
                 * will suddenly jump in position. To ensure smooth movement,
                 * we force the control and content to match sizes.
                 * 
                 * We first set the content's width to match the container's
                 * width. This may cause the content to change in height.
                 * We then set the container's height to match the content's.
                 */
                this.$PersistentPanel_content().width( this.width() );
                this.height( this.$PersistentPanel_content().outerHeight( true ) );

                var css;
                var viewPortTop = isScrollingParentWindow
                    ? 0
                    : $scrollingParent.offset().top;
                if ( aboveViewPort ) {
                    css = { "top": viewPortTop + "px" };
                } else {
                    var viewPortBottom = isScrollingParentWindow
                        ? 0
                        : viewPortTop + $scrollingParent.height();
                    css = { "bottom": viewPortBottom };
                }
                this.$PersistentPanel_content().css( css );
                
            } else {
                // Reset any dimensions we set while docked.
                this.$PersistentPanel_content().css({
                    "bottom": "",
                    "top": "",
                    "width": ""
                });
                this.css( "height", "" );
            }
            
            this.docked( dock );
        }
    }
    
});

//
// Repeater
//
Repeater = Control.subclass({
    name: "Repeater"
});
Repeater.prototype.extend({

    controlClass: Control.property[ "class" ]( function() { this._refresh(); }),
    controls: Control.chain( "children", "control" ),
    count: Control.property.integer( function() { this._refresh(); }, 0 ),
    
    initialize: function() {
        this._refresh();
    },

    // Setting the content sets the content of the contained controls.
    content: Control.property( function( content ) {
        if ( this.controls() ) {
            this.controls().content( content );
        }
    }),

    _refresh: function() {
        var controlClass = this.controlClass();
        var count = this.count();
        if ( controlClass && count > 0 ) {
            var content = this.content();
            var controls = [];
            for ( var i = 0; i < count; i++ ) {
                var $control = controlClass.create();
                if ( content ) {
                    $control.content( content );
                }
                controls.push( $control );
            }
        }
        // Use base .content() property since we've overridden it.
        Control( this ).content( controls );
    }
    
});

//
// SearchBox
//
SearchBox = Control.subclass({
    name: "SearchBox",
    content: [
        " ",
        {
            control: "TextBoxWithButton",
            textBox: [
                " ",
                {
                    control: "HintTextBox",
                    id: "searchTerms",
                    hint: "Enter search"
                },
                " "
            ],
            goButton: [
                " ",
                {
                    control: "SampleSpriteButton",
                    id: "searchButton",
                    content: "Search"
                },
                " "
            ]
        },
        " "
    ]
});
SearchBox.prototype.extend({
    
    hint: Control.chain("$searchTerms", "hint"),
    query: Control.property(null, "%s"),
    
    initialize: function() {
        var self = this;
        this.bind("goButtonClick", function() {
            var searchTerms = self.$searchTerms().content();
            var url = self.query().replace("%s", searchTerms);
            window.location.href = url;
        });
        this.$searchTerms().focus();
    }
    
});

//
// SlidingPages
//
SlidingPages = Control.subclass({
    name: "SlidingPages",
    content: [
        " ",
        {
            html: "<div />",
            id: "SlidingPages_content"
        },
        " "
    ]
});
SlidingPages.prototype.extend({
    
    pages: Control.chain( "$SlidingPages_content", "children" ),
    
    initialize: function() {
        this.inDocument( function( $control ) {
            $control._adjustWidths();
        });
        if ( !this.activeIndex() ) {
            this.activeIndex(0);
        }
    },

    content: Control.chain( "$SlidingPages_content", "content", function() {
        this._adjustWidths();
    }),
    
    activeIndex: Control.property.integer( function( activeIndex ) {
        var page = this.pages().eq( activeIndex );
        if ( page.length > 0 ) {
            var left = page.position().left;
            this.$SlidingPages_content().animate({
                "left": -left
            }, "fast" );
        }
    }),
    
    // Force all pages and the control itself to the maximium width of the pages.
    _adjustWidths: function() {

        var pages = this.pages();
        if ( pages.length === 0 ) {
            return;
        }
        
        var pageWidths = pages.map( function( index, page ) {
            return $( page ).width();
        }).get();
        var maxPageWidth = Math.max.apply( this, pageWidths );
        if ( maxPageWidth > 0 ) {
            pages.width( maxPageWidth );
        }

        var pageOuterWidths = pages.map( function( index, page ) {
            return $( page ).outerWidth( true );
        }).get();
        var maxPageOuterWidth = Math.max.apply( this, pageOuterWidths );
        if ( maxPageOuterWidth > 0 ) {
            this.width( maxPageOuterWidth );
        }
    }
    
});

//
// SlidingPagesWithDots
//
SlidingPagesWithDots = Control.subclass({
    name: "SlidingPagesWithDots",
    content: [
        " ",
        {
            control: "SlidingPages",
            id: "pages"
        },
        " ",
        {
            html: "<div />",
            id: "buttonPanel",
            content: [
                " ",
                {
                    control: "Repeater",
                    id: "pageButtons"
                },
                " "
            ]
        },
        " "
    ]
});
SlidingPagesWithDots.prototype.extend({
    
    content: Control.chain( "$pages", "content" ),
    pageButtons: Control.chain( "$pageButtons", "children" ),
    pageButtonClass: Control.chain( "$pageButtons", "controlClass" ),
    pages: Control.chain( "$pages", "pages" ),
    
    initialize: function() {
        
        this.genericIfClassIs( SlidingPagesWithDots );
        if ( !this.pageButtonClass() ) {
            this.pageButtonClass( ButtonBase );
        }

        // TODO: Use $.on() when that becomes available.
        var self = this;
        this.$pageButtons().click( function( event ) {
            var buttonClassName = self.pageButtonClass().prototype.className;
            var buttonCssClassName = "." + buttonClassName;
            var pageButton = $( event.target ).closest( buttonCssClassName ).control();
            if ( pageButton ) {
                var index = self.pageButtons().index( pageButton );
                if ( index >= 0 ) {
                    self.activeIndex( index );
                }
            }
        });
        
        if ( !this.activeIndex() ) {
            this.activeIndex(0);
        }
    },
    
    activeIndex: Control.property( function( activeIndex ) {
        this.$pages().activeIndex( activeIndex );
        this.pageButtons()
            .removeClass( "selected" )
            .eq( activeIndex )
                .addClass( "selected" );
        return this;
    }),
    
    content: Control.chain( "$pages", "content", function() {
        this.$pageButtons().count( this.pages().length );
    })

});

//
// SpriteButton
//
SpriteButton = ButtonBase.subclass({
    name: "SpriteButton",
    content: [
        " ",
        {
            control: "Sprite",
            id: "backgroundLeft"
        },
        " ",
        {
            control: "Sprite",
            id: "backgroundRight"
        },
        " ",
        {
            html: "<button />",
            id: "SpriteButton_content"
        },
        " "
    ]
});
SpriteButton.prototype.extend({
    
    content: Control.chain("$SpriteButton_content", "content"),
    image: Control.chain("$sprites", "image"),

    initialize: function() {
        this._super();
        var self = this;
        this.$SpriteButton_content()
            .blur(function() { self.blur(); })
            .focus(function() { self.focus(); });
    },
    
    cellHeight: Control.chain("css/height", function(value) {
        this.$SpriteButton_content().height(value + "px");
        this.$sprites().cellHeight(value);
    }),
    
    disabled: function(value) {
        if (value !== undefined)
        {
            this.$SpriteButton_content().attr("disabled", String(value) == "true");
        }
        return this._super( value );
    },
    
    $sprites: function() {
        return this.children().filter(".Sprite").cast();
    },
    
    _renderButtonState: function(buttonState) {
        this.$sprites().currentCell(buttonState);
    }

});

//
// TextBoxWithButton
//
TextBoxWithButton = Control.subclass({
    name: "TextBoxWithButton",
    content: [
        " ",
        {
            html: "<div />",
            id: "TextBoxWithButton_textBox"
        },
        " ",
        {
            html: "<div />",
            id: "TextBoxWithButton_goButton"
        },
        " "
    ]
});
TextBoxWithButton.prototype.extend({
    
    goButton: Control.chain("$TextBoxWithButton_goButton", "content"),    
    textBox: Control.chain("$TextBoxWithButton_textBox", "content"),
    
    initialize: function() {
        var self = this;
        this.$TextBoxWithButton_textBox().bind("change keydown keyup", function(event) {
            self._disableButtonIfContentEmpty();
            var keyCode = event.keyCode || event.which;
            if (!self._isContentEmpty() && keyCode == 13 /* Enter */)
            {
                self.trigger("goButtonClick");
            }
        });
        this.$TextBoxWithButton_goButton().click(function() {
            self.trigger("goButtonClick");
        });
        this._disableButtonIfContentEmpty();
    },
    
    content: function(value) {
        result = this.$TextBoxWithButton_textBox().content(value); 
        if (value !== undefined) 
        {
            this._disableButtonIfContentEmpty();
        }
        return result;
    },
    
    _disableButtonIfContentEmpty: function() {
        var content = this.content();
        var $goButton = this.$TextBoxWithButton_goButton();
        if ($goButton.children().length > 0)
        {
            var buttonControl = Control($goButton.children()[0]);
            if (buttonControl != null && buttonControl instanceof ButtonBase)
            {
                buttonControl.disabled(this._isContentEmpty());
            }
        }
    },
    
    _isContentEmpty: function() {
        var content = this.content();
        return !(content && content.length > 0);
    }
    
});

//
// TextCondenser
//
TextCondenser = Layout.subclass({
    name: "TextCondenser",
    content: [
        " ",
        {
            html: "<span />",
            id: "normal"
        },
        " ",
        {
            html: "<span />",
            id: "condensed"
        },
        " "
    ]
});
TextCondenser.prototype.extend({
    
    condensedFontFamily: Control.chain("$condensed", "css/font-family"),

    content: Control.chain("$normal", "content", function(content) {
        this.$condensed().content(content); // Make a copy of the text.
        this.layout();
    }),
    
    layout: function() {
        return this.eachControl(function(index, $control) {
            var tooWide = this.$normal().width() > this.width();
            this.applyClass("condensed", tooWide);
        });
    }
});

//
// ValidatingTextBox
//
ValidatingTextBox = TextBox.subclass({
    name: "ValidatingTextBox"
});
ValidatingTextBox.prototype.extend({
    
    invalid: Control.chain( "applyClass/invalid" ),
    
    // True if the field must be non-empty.
    required: Control.property.bool(),
    
    validateOnBlur: Control.property.bool( null, true ),
    
    initialize: function() {
        
        this._super();
        this.genericIfClassIs( ValidatingTextBox );
        
        var self = this;
        this.$textBox().bind({
            "blur": function() {
                if ( self.validateOnBlur() ) {
                    self.validate( true );
                }
            },
            "keyup": function() {
                self.validate();
            }
        });
    },
    
    /*
     * Setting the content programmatically implicitly performs validation.
     */
    content: function( content ) {
        var result = this._super( content );
        if ( content !== undefined ) {
            this.validate( true );
        }
        return result;
    },
    
    /*
     * Check to see if the control's contents are valid.
     * 
     * If the strict parameter is true, apply the invalid state if the contents
     * are invalid. If the strict parameter is false, then the control can move
     * out of the invalid state (if the contents are now valid), but won't move
     * into the invalid state (even if the contents are actually invalid).
     */
    validate: Control.iterator( function( strict ) {
        var valid = this.valid();
        if ( strict || this.invalid() ) {
            this.invalid( !valid );
        }
    }),
    
    /*
     * Returns true if the control's contents are valid.
     * The default implementation simply looks as the required() property and,
     * if true, ensures the content is non-empty.
     *  
     * Subclasses can override this to validate their contents. E.g.:
     * 
     *  valid: function() {
     *      var valid = this._super();
     *      valid = valid && ... Perform additional checks here ...
     *      return valid;
     *  }
     */
    valid: function() {
        var valid;
        if ( this.required() )
        {
            var content = this.content();
            valid = !!content && content.length > 0;
        } else {
            valid = true;
        }
        return valid;
    }
});

//
// CalendarMonthNavigator
//
CalendarMonthNavigator = LateralNavigator.subclass({
    name: "CalendarMonthNavigator",
    heading: [
        " ",
        {
            control: "MonthName",
            id: "monthName"
        },
        " ",
        {
            html: "<span />",
            id: "year"
        },
        " "
    ],
    content: [
        " ",
        " ",
        {
            control: "CalendarMonthWithHeadings",
            id: "calendar",
            showMonthName: "false"
        },
        " ",
        {
            html: "<div />",
            id: "todayContainer",
            content: [
                " ",
                {
                    control: "ButtonBase",
                    id: "buttonToday",
                    content: "Today"
                },
                " "
            ]
        },
        " "
    ]
});
CalendarMonthNavigator.prototype.extend({
    
    dayNameFormat: Control.chain( "$calendar", "dayNameFormat" ),
    showTodayButton: Control.chain( "$todayContainer", "visibility" ),

    initialize: function() {
        
        CalendarMonthNavigator.superclass.prototype.initialize.call( this );
        this.genericIfClassIs( CalendarMonthNavigator );
        
        var self = this;
        this.bind({
            "dateChanged": function( event, date ) {
                self.date( date );
            },
            "dateSelected": function( event, date ) {
                self.$calendar().date( date );
            }
        });
        this.$buttonToday().click( function() {
            self.trigger( "dateSelected", [ CalendarDay.today() ]);
        });
        
        if ( !this.dayClass() ) {
            this.dayClass( CalendarDayButton );
        }
        
        if ( !this.date() ) {
            this.date( this.$calendar().date() );
        }
    },

    culture: function( culture ) {
        var result = this._super( culture );
        if ( culture !== undefined ) {
            this.$monthName().culture( culture );
            this.$calendar().culture( culture );
        }
        return result;
    },
    
    date: Control.property( function( date ) {
        if ( this.$calendar().date().getTime() !== date.getTime() ) {
            this.$calendar().date( date );
        }
        this.$monthName().month( date.getMonth() );
        this.$year().content( date.getFullYear() );
        this._applySelection();
    }), 
    
    /*
     * Define our own dayClass property so we can tell if its been set,
     * so we can provide a default dayClass.
     */
    dayClass: Control.property[ "class" ]( function( dayClass ) {
        this.$calendar().dayClass( dayClass );
    }),

    next: function() {
        // Go one month forward.
        this._adjustMonth( 1 );
    },
    
    previous: function() {
        // Go one month backward.
        this._adjustMonth( -1 );
    },
    
    /* True if the selected date should receive the "selected" style */
    showSelectedDate: Control.property.bool( function( showSelectedDate ) {
        // Force selection (or not) of currently-selected date.
        this._applySelection();
    }, true ),
    
    // Move one month forward (if direction is positive) or backward
    // (if direction is negative).
    _adjustMonth: function( direction ) {
        var adjustment = (direction > 0) ? 1 : -1;
        var newDate = new Date( this.date().getTime() );
        var dayOfMonth = newDate.getDate();
        newDate.setMonth( newDate.getMonth() + adjustment );
        if ( newDate.getDate() != dayOfMonth ) {
            // We either overshot (tried to go from Oct 31 to "Nov 31") going
            // forward, or undershot (tried to go from Dec 31 to "Nov 31")
            // going backward. In either case, the fix is to back up to the last
            // date of the previous month, which can be accomplished by the
            // trick of setting the day of the month to zero.
            newDate.setDate(0);
        }
        this.date( newDate );
    },
    
    _applySelection: function() {
        this.$calendar().$days().removeClass( "selected" );
        if ( this.showSelectedDate() ) {
            var dayControl = this.$calendar().dayControlForDate( this.date() );
            dayControl.addClass( "selected" );
        }
    }
    
});

//
// ColorSwatchComboBox
//
ColorSwatchComboBox = ListComboBox.subclass({
    name: "ColorSwatchComboBox",
    textBoxClass: "ColorSwatchTextBox",
    itemClass: "ColorSwatchButton"
});
ColorSwatchComboBox.prototype.extend({
    initialize: function() {
        this._super();
        this.genericIfClassIs( ColorSwatchComboBox );
        this.items([
            "Blue",
            "DarkGreen",
            "DarkBlue",
            "DarkRed",
            "Gold",
            "Goldenrod",
            "Green",
            "LightGray",
            "LightSeaGreen",
            "LightSkyBlue",
            "Red",
            "SteelBlue",
            "Yellow",
            "YellowGreen"
        ]);
    }
});

//
// DateTextBox
//
DateTextBox = ValidatingTextBox.subclass({
    name: "DateTextBox"
});
DateTextBox.prototype.extend({
    
    _datePatterns: Control.property(),
    _previousDate: Control.property.date(),
    
    initialize: function() {
        
        this._super();
        this.genericIfClassIs( DateTextBox );
        
        var self = this;
        this.$textBox().blur( function() {
            self._refresh();
        });
        
        this._updateDatePatterns();
    },

    culture: function( culture ) {
        var result = this._super( culture );
        if ( culture !== undefined ) {
            this._updateDatePatterns();
            this._refresh();
        }
        return result;
    },

    date: Control.property.date( function( date ) {
        var previousDate = this._previousDate();
        var previousTime = previousDate && previousDate.getTime();
        var time = date && date.getTime();
        var dateChanged = ( previousTime !== time ); 
        if ( dateChanged ) {
            
            var hasFocus = $.contains( this[0], document.activeElement );
            if ( !hasFocus ) {
                // We updating the content only if the user isn't typing,
                // so as not to confuse them.
                this._refresh();
            }
            
            this
                ._previousDate( date )
                .trigger( "dateChanged", [ date ] );
        }
    }),
    
    valid: function() {

        var valid = this._super();

        // Convert content text to a date.
        var content = this.content();
        var date = this._parseDate( content );
        this.date( date );

        // If a date is supplied, it has to be valid.
        if ( content && content.length > 0 ) {
            valid = valid && !!date;
        }
        
        return valid;
    },
    
    /*
     * Use a culture's "short date" pattern (e.g., "M/d/yyyy") to determine
     * some abbreviated date patterns.
     * 
     * The first abbreviated pattern uses a short two-digit year ("M/d/yy")
     * instead of a full four-digit year. The second pattern omits the year
     * ("M/d"). These patterns are determined by looking for a full year
     * placeholder ("yyyy") and the culture's date separator ("/") immediately
     * before or after the year.
     */
    _abbreviatedDatePatterns: function( culture ) {
        
        var patterns = [];
        var calendar = culture.calendar;
        var shortPattern = calendar.patterns.d;
        var fullYearPlaceholder = "yyyy";
        
        // Try replacing full four-digit year with short two-digit year.
        if ( shortPattern.indexOf ( fullYearPlaceholder ) ) {
            patterns.push( shortPattern.replace( fullYearPlaceholder, "yy" ));
        }
        
        // Try removing separator + year, then try removing year + separator.
        var separator = calendar[ "/" ];
        var separatorThenYear = separator + fullYearPlaceholder;
        var yearThenSeparator = fullYearPlaceholder + separator;
        if ( shortPattern.indexOf( separatorThenYear ) >= 0 ) {
            patterns.push( shortPattern.replace( separatorThenYear, "" ) );
        } else if ( shortPattern.indexOf( yearThenSeparator ) >= 0 ) {
            patterns.push( shortPattern.replace( yearThenSeparator, "" ) );
        }
        
        return patterns;
    },
    
    // Return the separator between dates.
    _dateSeparator: function() {
        var culture = this.culture();
        var calendar = culture ? culture.calendar : DateTextBox;
        return calendar[ "/" ];
    },
    
    _formatDate: function( date ) {
        var culture = this.culture();
        var formattedDate;
        if ( culture ) {
            formattedDate = Globalize.format( date, culture.calendar.patterns.d, culture );
        } else {
            formattedDate = (date.getMonth() + 1) + 
                this._dateSeparator() + date.getDate() +
                this._dateSeparator() + date.getFullYear();
        }
        return formattedDate;
    },

    /*
     * Parse the given text as a date.
     * Use the culture's parser if available, otherwise use a default parser.
     */
    _parseDate: function( text ) {
        var date = this.culture()
            ? Globalize.parseDate( text, this._datePatterns(), this.culture() )
            : this._parseDateDefault( text );
        return date;
    },
    
    /*
     * Basic date parser.
     * Parses the given text as a date and return the result.
     * Returns null if the text couldn't be parsed.
     * 
     * This handles the formats supported by the standard Date.parse(),
     * as well as handling a short year ("1/1/12") or missing year ("1/1").
     */
    _parseDateDefault: function( text ) {
        
        var dateSeparator = this._dateSeparator();
        var parts = text.split( dateSeparator );
        var currentYear = ( new Date() ).getFullYear().toString();
        
        var munged;
        if ( parts.length === 2 ) {
            // Add on year
            munged = text + dateSeparator + currentYear;
        } else if ( parts.length === 3 && parts[2].length == 2 ) {
            // Convert short year to long year
            var fullYear = currentYear.substring(0, 2) + parts[2];
            munged = parts[0] + dateSeparator
                   + parts[1] + dateSeparator
                   + fullYear;
        } else {
            // Parse as is
            munged = text;
        }
        
        var milliseconds = Date.parse( munged );
        var date = isNaN( milliseconds )
            ? null
            : new Date( milliseconds );
        return date;
    },
    
    _refresh: function() {
        var date = this.date();
        if ( !!date ) {
            var formattedDate = this._formatDate( date );
            if ( formattedDate !== this.content() ) {
                this.content( formattedDate );
            }
        }
        return this;
    },
    
    /*
     * If the culture's been set, we amend the list of support date patterns
     * to include some abbreviated patterns.
     */
    _updateDatePatterns: function() {
        var datePatterns = null;
        var culture = this.culture();
        if ( culture ) {
            // Update our date patterns based on the new culture.
            var abbreviatedDatePatterns = this._abbreviatedDatePatterns( culture );
            if ( abbreviatedDatePatterns.length > 0 ) {
                // Add our abbreviated patterns to all the culture's patterns.
                datePatterns = $.map( this.culture().calendar.patterns, function( pattern, name ) {
                    return pattern;
                });
                datePatterns = datePatterns.concat( abbreviatedDatePatterns );
            }
        }
        this._datePatterns( datePatterns );
    }
    
});

/*
 * Class properties.
 */
DateTextBox.extend({
    // Date separator, used when Globalize is not present.
	"/": "/"
});

//
// RotatingPagesWithDots
//
RotatingPagesWithDots = SlidingPagesWithDots.subclass({
    name: "RotatingPagesWithDots"
});
RotatingPagesWithDots.prototype.extend({
    
    // Interval between rotation animations (does not include animation duration).
    rotationInterval: Control.property.integer( null, 1000 ),
    _timeout: Control.property(),
    
    initialize: function() {
        
        this._super();
        this.genericIfClassIs( RotatingPagesWithDots );
        
        var self = this;
        this
            .click( function() { self.stop(); })
            .inDocument( function( $control ) { $control._queueRotation(); });
    },
    
    /*
     * Rotates to the next page. When it hits the last one, it rotates
     * back to the first page and stops.
     */
    rotate: Control.iterator( function () {
        var count = this.pages().length;
        if ( count > 0 ) {
            
            var index = this.activeIndex();
            index = ( index + 1 ) % count;
            this.activeIndex( index );
            if ( index > 0 ) {
                this._queueRotation();
            }
        }
    }),

    // Stop the rotation    
    stop: Control.iterator( function() {
        clearTimeout( this._timeout() );
        this._timeout( null );
        return this;
    }),
    
    _queueRotation: function() {
        var rotationInterval = this.rotationInterval();
        var self = this;
        this._timeout( setTimeout( function() { self.rotate(); }, rotationInterval ) );
    } 
});

//
// SampleSpriteButton
//
SampleSpriteButton = SpriteButton.subclass({
    name: "SampleSpriteButton",
    image: "url(/catalog/resources/sampleButtonStates.png)",
    cellHeight: "32"
});

