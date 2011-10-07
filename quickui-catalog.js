//
// AutoSizeTextBox
//
AutoSizeTextBox = Control.subclass( "AutoSizeTextBox", function renderAutoSizeTextBox() {
	this.properties({
		"content": [
			" ",
			this._define( "$textBox", Control( "<textarea id=\"textBox\" />" ) ),
			" ",
			this._define( "$textCopy", MultiLineText.create({
				"id": "textCopy"
			}) ),
			" "
		]
	}, Control );
});
AutoSizeTextBox.prototype.extend({
    
    minHeight: Control.chain("css/min-height"),
    
    initialize: function() {
        var self = this;
        this.$textBox().bind("change keydown keyup", function() {
            self.autoSize();
        });
    
        // For the following, we need to wait until the control's in the DOM.    
        this.insertedIntoDocument(function() {
            // Apply control's font to the textarea.
            var $textBox = self.$textBox();
            $textBox.css({
                "font-family": self.css("font-family"),
                "font-size": self.css("font-size"),
                "font-style": self.css("font-style"),
                "font-weight": self.css("font-weight")
            });
            // Mirror the textarea's padding on the text copy.
            // Also add an extra line on the bottom so user sees they have more room.
            // For this we use an estimate, as line-height can return useless "normal" value.
            var paddingBottom = parseInt($textBox.css("padding-bottom"));
            var lineHeight = Math.floor(parseInt($textBox.css("font-size")) * 1.5);
            self.$textCopy().css({
                "padding-bottom": (paddingBottom + lineHeight) + "px",  
                "padding-left": $textBox.css("padding-left"),
                "padding-right": $textBox.css("padding-right"),
                "padding-top": $textBox.css("padding-top")
            });
        });
    },

    // Resize the text box to exactly contain its content.
    autoSize: function() {        
        // Copy text box contents; browser will calculate correct height of copy,
        // which will make overall control taller, which will make text box taller.
        this.$textCopy().content(this.$textBox().content());
    },
    
    content: Control.chain("$textBox", "content", function() {
        this.autoSize();
    })
    
});

//
// AutoSizeTextBoxDemo
//
AutoSizeTextBoxDemo = Control.subclass( "AutoSizeTextBoxDemo", function renderAutoSizeTextBoxDemo() {
	this.properties({
		"content": [
			" ",
			AutoSizeTextBox.create(),
			" "
		]
	}, Control );
});

//
// DotButton
//
DotButton = Control.subclass( "DotButton", function renderDotButton() {
	this.properties({
		"content": [
			" ",
			this._define( "$button", ButtonBase.create({
				"id": "button",
				"generic": "false"
			}) ),
			" "
		]
	}, Control );
});

//
// BrowserSpecificDemo
//
BrowserSpecificDemo = Control.subclass( "BrowserSpecificDemo", function renderBrowserSpecificDemo() {
	this.properties({
		"content": [
			" ",
			BrowserSpecific.create({
				"style": "display: inline",
				"webkit": "You are using WebKit.",
				"msie": "You are using Internet Explorer.",
				"mozilla": "You are using Firefox.",
				"default": "You are using some unknown browser."
			}),
			" "
		]
	}, Control );
});

//
// ButtonBaseDemo
//
ButtonBaseDemo = Control.subclass( "ButtonBaseDemo", function renderButtonBaseDemo() {
	this.properties({
		"content": [
			" ",
			ButtonBase.create({
				"content": "OK"
			}),
			" ",
			ButtonBase.create({
				"content": "Cancel"
			}),
			" "
		]
	}, Control );
});

//
// CatalogIndexPage
//
CatalogIndexPage = SitePage.subclass( "CatalogIndexPage", function renderCatalogIndexPage() {
	this.properties({
		"title": "QuickUI Catalog",
		"area": "Catalog",
		"navigationLinks": [
			" ",
			CatalogNavigationLinks.create(),
			" "
		],
		"content": [
			" ",
			" ",
			"<p>\n\tThe QuickUI Catalog shows live examples of QuickUI controls, many\n\tdesigned to be ready-to-use base classes for new controls.\n\t(Note: Many controls depend on other controls, either for base classes,\n\tor as contained elements within a given control. Because QuickUI does\n\tnot yet offer a dependency-management, for now it's necessary to download\n\tall dependencies by hand. Automating this process is on the QuickUI\n\troadmap.\n\t</p>",
			" ",
			Control( "<p />" ).content(
				" The source code for these controls is available in the ",
				Link.create({
					"content": " quickui-catalog repository ",
					"href": "https://github.com/JanMiksovsky/quickui-catalog"
				}),
				" on GitHub. "
			),
			" ",
			this._define( "$table", Control( "<div id=\"table\" />" ).content(
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "AutoSizeTextBox"
						})
					),
					" ",
					"<div>A text area that expands to contain its text.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "BrowserSpecific"
						})
					),
					" ",
					"<div>Conditionally shows contents for specific browsers.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "ButtonBase"
						})
					),
					" ",
					"<div>Base class for buttons which handles tracking of button states.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "ComboBox"
						})
					),
					" ",
					"<div>Base class for a combo box: a text input area with a dropdown set of choices.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "DeviceSpecific"
						})
					),
					" ",
					"<div>\n                Conditionally loads different content, control class, or styles\n                depending on the type of device.\n            </div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "Dialog"
						})
					),
					" ",
					"<div>Base class for modal dialogs.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "Fader"
						})
					),
					" ",
					"<div>Fades out content on the right or bottom instead of clipping it.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "CatalogPage"
						})
					),
					" ",
					"<div>The template for all pages in this gallery.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "Gradient"
						})
					),
					" ",
					"<div>A browser-agnostic gradient representation.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "HasPopup"
						})
					),
					" ",
					"<div>A control that has an associated popup that will appear above or below the control.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "HintTextBox"
						})
					),
					" ",
					"<div>A text box that displays a hint (instructions) when the text box is empty.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "HorizontalPanels"
						})
					),
					" ",
					"<div>\n                A layout control that arranges left and/or right side panels.\n            </div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "List"
						})
					),
					" ",
					"<div>\n                An abstract control that represents each element of a JavaScript\n                array as a QuickUI control.\n            </div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "LoremIpsum"
						})
					),
					" ",
					"<div>Generates placeholder text.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "MultiLineText"
						})
					),
					" ",
					"<div>Displays text that may have line breaks and/or HTML entities.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "Page"
						})
					),
					" ",
					"<div>\n                Base class for creating top-level pages.\n            </div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "Popup"
						})
					),
					" ",
					"<div>\n                Base class for popups, menus, dialogs — things that temporarily appear over other things.\n            </div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "SampleSpriteButton"
						})
					),
					" ",
					"<div>An example of creating a sprite button through subclassing.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "SearchBox"
						})
					),
					" ",
					"<div>A typical web search box.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "Sprite"
						})
					),
					" ",
					"<div>A basic CSS sprite.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "SpriteButton"
						})
					),
					" ",
					"<div>A button that uses a sprite for its background.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "Switch"
						})
					),
					" ",
					"<div>\n                Something like a JavaScript switch statement, this shows exactly\n                one child at any given time (e.g., to reflect an UI mode).\n            </div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "Tag"
						})
					),
					" ",
					"<div>A simple HTML macro that includes both content and styling.</div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "TextBoxWithButton"
						})
					),
					" ",
					"<div>\n                A control with a text box and an associated button, where clicking\n                the button does something with the text box's content.\n            </div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "TextCondenser"
						})
					),
					" ",
					"<div>\n                Switches to a condensed font when necessary to squeeze in more text.\n            </div>",
					" "
				),
				" ",
				Control( "<div />" ).content(
					" ",
					Control( "<div />" ).content(
						CatalogLink.create({
							"content": "VerticalPanels"
						})
					),
					" ",
					"<div>\n                A layout control that arranges top and/or bottom panels.\n            </div>",
					" "
				),
				" "
			) ),
			" "
		]
	}, SitePage );
});

//
// CatalogNavigationLinks
//
CatalogNavigationLinks = Control.subclass( "CatalogNavigationLinks", function renderCatalogNavigationLinks() {
	this.properties({
		"content": [
			" ",
			this._define( "$linkIndex", Link.create({
				"content": "Index",
				"id": "linkIndex",
				"href": "/catalog/default.html"
			}) ),
			" ",
			this._define( "$listClass", List.create({
				"id": "listClass",
				"itemClass": "CatalogLink"
			}) ),
			" "
		]
	}, Control );
});
CatalogNavigationLinks.prototype.extend({
    initialize: function() {
        this.$listClass().items([
            "AutoSizeTextBox",
            "BrowserSpecific",
            "ButtonBase",
            "ComboBox",
            "DeviceSpecific",
            "Dialog",
            "Fader",
            "CatalogPage",
            "Gradient",
            "HasPopup",
            "HintTextBox",
            "HorizontalPanels",
            "List",
            "LoremIpsum",
            "MultiLineText",
            "Page",
            "Popup",
            "SampleSpriteButton",
            "SearchBox",
            "Sprite",
            "SpriteButton",
            "Switch",
            "Tag",
            "TextBoxWithButton",
            "TextCondenser",
            "VerticalPanels"
        ]);
    }
});

//
// CatalogPage
//
CatalogPage = SitePage.subclass( "CatalogPage", function renderCatalogPage() {
	this.properties({
		"area": "Gallery",
		"navigationLinks": [
			" ",
			CatalogNavigationLinks.create(),
			" "
		],
		"content": [
			" ",
			this._define( "$CatalogPage_summary", Control( "<div id=\"CatalogPage_summary\" />" ) ),
			" ",
			"<h2>Live demo</h2>",
			" ",
			CodeOutput.create({
				"content": [
					" ",
					this._define( "$CatalogPage_demo", Control( "<div id=\"CatalogPage_demo\" />" ) ),
					" "
				]
			}),
			" ",
			this._define( "$usage", Control( "<div id=\"usage\" />" ).content(
				" ",
				"<h2>Sample usage</h2>",
				" ",
				this._define( "$sourceCodeExample", SourceCode.create({
					"id": "sourceCodeExample"
				}) ),
				" "
			) ),
			" ",
			"<h2>Full control source code</h2>",
			" ",
			this._define( "$sourceCodeControl", SourceCode.create({
				"id": "sourceCodeControl"
			}) ),
			" ",
			"<h2>Notes</h2>",
			" ",
			this._define( "$CatalogPage_notes", Control( "<div id=\"CatalogPage_notes\" />" ) ),
			" "
		]
	}, SitePage );
});
CatalogPage.prototype.extend({
	demo: Control.chain("$CatalogPage_demo", "content"),
	notes: Control.chain("$CatalogPage_notes", "content"),
	sourceFileControl: Control.chain("$sourceCodeControl", "sourceFile"),
	sourceFileExample: Control.chain("$sourceCodeExample", "sourceFile", function( sourceFileExample ) {
	    this.$usage().toggle( sourceFileExample != null );
	}),
	summary: Control.chain("$CatalogPage_summary", "content")
});

//
// CatalogPageAbout
//
CatalogPageAbout = CatalogPage.subclass( "CatalogPageAbout", function renderCatalogPageAbout() {
	this.properties({
		"title": "CatalogPage",
		"sourceFileExample": "CatalogPage/CatalogPageAbout.qui",
		"sourceFileControl": "controls/CatalogPage.qui",
		"summary": " The CatalogPage control is the basic template for all controls in the QuickUI gallery. It defines the main content area of the type of page you are looking at right now. ",
		"demo": " This page is its own demo of the control’s behavior! The Sample Usage section shows the entire source code of the elements unique to the specific page you’re looking at now. All pages on this site are constructed similarly. ",
		"notes": [
			" This control is a good example of a page template with numerous slots which can be filled in by setting properties on the control. For the control properties that point to source code, the CatalogPage control delegates responsibility for showing the source code to the separate SourceCode control. CatalogPage is a subclass of another control called SitePage (which adds the site’s standard top and left navigation) and ultimately from the ",
			CatalogLink.create({
				"content": "Page"
			}),
			" base class. "
		]
	}, CatalogPage );
});

//
// ComboBoxAbout
//
ComboBoxAbout = CatalogPage.subclass( "ComboBoxAbout", function renderComboBoxAbout() {
	this.properties({
		"title": "ComboBox",
		"sourceFileExample": "ComboBox/ComboBoxDemo.qui",
		"sourceFileControl": "../quicommon/ComboBox.qui",
		"summary": " A text input area with a dropdown set of choices. The user can make selections from the list to populate input area, or they can type arbitrary text strings which don't necessarily appear in the list. ",
		"demo": [
			" ",
			ComboBoxDemo.create(),
			" "
		],
		"notes": [
			" The HTML5 specification calls for a ",
			Tag.create({
				"content": "datagrid"
			}),
			" element which can be used to create combo boxes, but even once that is broadly supported, the ComboBox class still has a role to play as a base class for custom combo boxes. "
		]
	}, CatalogPage );
});

//
// ComboBoxDemo
//
ComboBoxDemo = Control.subclass( "ComboBoxDemo", function renderComboBoxDemo() {
	this.properties({
		"content": [
			" ",
			this._define( "$comboBox", ListComboBox.create({
				"id": "comboBox",
				"itemClass": "ButtonBase"
			}) ),
			" "
		]
	}, Control );
});
ComboBoxDemo.prototype.extend({
    initialize: function() {
        this.$comboBox().items([
            "Bird",
            "Cat",
            "Dog",
            "Hamster"
        ]);
    }
});

//
// DeviceSpecificAbout
//
DeviceSpecificAbout = CatalogPage.subclass( "DeviceSpecificAbout", function renderDeviceSpecificAbout() {
	this.properties({
		"title": "DeviceSpecific",
		"sourceFileExample": "DeviceSpecific/DeviceSpecificDemo.qui",
		"sourceFileControl": "../quicommon/DeviceSpecific.qui",
		"summary": " Conditionally loads different content, control class, or styles depending on the type of device. ",
		"demo": [
			" ",
			DeviceSpecificDemo.create(),
			" "
		],
		"notes": " This class can form one part of a strategy for building a web site with a full version and a mobile-optimized version. "
	}, CatalogPage );
});

//
// DeviceSpecificDemo
//
DeviceSpecificDemo = Control.subclass( "DeviceSpecificDemo", function renderDeviceSpecificDemo() {
	this.properties({
		"content": [
			" ",
			DeviceSpecific.create({
				"mobileClass": "Link",
				"defaultClass": "SampleSpriteButton",
				"mobile": "You are mobile",
				"default": "You are not mobile"
			}),
			" "
		]
	}, Control );
});

//
// DialogAbout
//
DialogAbout = CatalogPage.subclass( "DialogAbout", function renderDialogAbout() {
	this.properties({
		"title": "Dialog",
		"sourceFileExample": "Dialog/DialogDemo.qui",
		"sourceFileControl": "../quicommon/Dialog.qui",
		"summary": " A modal dialog; must be dismissed before the user can interact with the UI behind it. ",
		"demo": [
			" ",
			this._define( "$dialogLink", Link.create({
				"content": "Show dialog",
				"id": "dialogLink"
			}) ),
			" "
		]
	}, CatalogPage );
});
DialogAbout.prototype.extend({
    initialize: function() {
        this.$dialogLink().click(function() {
            Dialog.showDialog(DialogDemo);
        });
    }
});

//
// DialogDemo
//
DialogDemo = Dialog.subclass( "DialogDemo", function renderDialogDemo() {
	this.properties({
		"content": [
			" ",
			"<h1>Sample dialog</h1>",
			" ",
			LoremIpsum.create({
				"paragraphs": "1"
			}),
			" ",
			this._define( "$buttonClose", SampleSpriteButton.create({
				"content": "Close",
				"id": "buttonClose"
			}) ),
			" "
		]
	}, Dialog );
});
DialogDemo.prototype.extend({
    initialize: function() {
        var self = this;
        this.$buttonClose().click(function() {
            self.close();
        });
    }
});

//
// Fader
//
Fader = Control.subclass( "Fader", function renderFader() {
	this.properties({
		"content": [
			" ",
			this._define( "$Fader_content", Control( "<div id=\"Fader_content\" />" ) ),
			" ",
			this._define( "$gradient", Gradient.create({
				"id": "gradient",
				"direction": "horizontal"
			}) ),
			" "
		]
	}, Control );
});
Control.prototype.extend({
    
});

Fader.prototype.extend({
    
    content: Control.chain("$Fader_content", "content"),
    
    initialize: function() {
        var self = this;
        this.insertedIntoDocument(function() {
            self.redraw();
        });
    },
    
    direction: Control.property(function(direction) {
        this
            .toggleClass("vertical", direction !== "horizontal")
            .redraw()
            .$gradient()
                .direction(direction);
    }),
    
    redraw: function() {
        var self = this;
        return this.eachControl(function(index, $control) {
            var backgroundColor = $control.css("background-color");
            var backgroundHex = (backgroundColor.substr(0, 3).toLowerCase() == "rgb")
                                    ? self._rgbStringToHexColor(backgroundColor)
                                    : backgroundColor;
            $control.$gradient()
                .start(backgroundHex + "00")
                .end(backgroundHex);
        });
    },
    
    _rgbStringToHexColor: function(rgbString) {
        rgb = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + this._hexByte(rgb[1]) + this._hexByte(rgb[2]) + this._hexByte(rgb[3]);
    },

    _hexByte: function(n) {
        var s = (new Number(n & 0xFF)).toString(16);
        if (s.length == 1)
        {
            s = "0" + s;
        }
        return s;
    }
    
});

//
// FaderAbout
//
FaderAbout = CatalogPage.subclass( "FaderAbout", function renderFaderAbout() {
	this.properties({
		"title": "Fader",
		"sourceFileExample": "Fader/FaderDemo.qui",
		"sourceFileControl": "Fader/Fader.qui",
		"summary": [
			" Fades out content on the right or bottom instead of clipping it by using an alpha-blended ",
			CatalogLink.create({
				"content": "Gradient"
			}),
			". "
		],
		"demo": [
			" ",
			FaderDemo.create(),
			" "
		]
	}, CatalogPage );
});

//
// FaderDemo
//
FaderDemo = Control.subclass( "FaderDemo", function renderFaderDemo() {
	this.properties({
		"content": [
			" ",
			Fader.create({
				"content": " The glass is neither half-full nor half-empty: it's twice as big as it needs to be. ",
				"style": "max-width: 175px;"
			}),
			" ",
			Fader.create({
				"content": " The glass is neither half-full nor half-empty: it's twice as big as it needs to be. ",
				"style": "max-width: 350px;"
			}),
			" ",
			Fader.create({
				"content": " The glass is neither half-full nor half-empty: it's twice as big as it needs to be. "
			}),
			" "
		]
	}, Control );
});

//
// GoogleSearchBox
//
GoogleSearchBox = Control.subclass( "GoogleSearchBox", function renderGoogleSearchBox() {
	this.properties({
		"content": [
			" ",
			SearchBox.create({
				"query": "http://www.google.com/search?q=%s",
				"hint": "Search Google"
			}),
			" "
		]
	}, Control );
});

//
// Gradient
//
Gradient = Control.subclass( "Gradient" );
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
// GradientAbout
//
GradientAbout = CatalogPage.subclass( "GradientAbout", function renderGradientAbout() {
	this.properties({
		"title": "Gradient",
		"sourceFileExample": "Gradient/GradientDemo.qui",
		"sourceFileControl": "Gradient/Gradient.qui",
		"summary": " The modern mainstream browsers all support CSS gradients—albeit with slightly different CSS syntax. The Gradient control presents an abstract representation of a horizontal or vertical linear gradient that invokes the browser's native gradient CSS support, freeing the developer from having to remember the specific per-browser syntax. ",
		"demo": [
			" ",
			GradientDemo.create(),
			" "
		]
	}, CatalogPage );
});

//
// GradientDemo
//
GradientDemo = Control.subclass( "GradientDemo", function renderGradientDemo() {
	this.properties({
		"content": [
			" ",
			Gradient.create({
				"start": "#808080",
				"end": "#f0f0f0"
			}),
			" "
		]
	}, Control );
});

//
// HasPopupAbout
//
HasPopupAbout = CatalogPage.subclass( "HasPopupAbout", function renderHasPopupAbout() {
	this.properties({
		"title": "HasPopup",
		"sourceFileExample": "HasPopup/HasPopupDemo.qui",
		"sourceFileControl": "../quicommon/HasPopup.qui",
		"summary": [
			" A control that has an associated ",
			CatalogLink.create({
				"content": "Popup"
			}),
			" which will appear above or below the control. See also ",
			CatalogLink.create({
				"content": "ComboBox"
			}),
			". "
		],
		"demo": [
			" ",
			HasPopupDemo.create(),
			" "
		],
		"notes": " The control attempts to position the popup such that it doesn't cover up the control. E.g., if the control is near the bottom of the viewport, and there is room to show the popup above the control, the popup will appear above the control. "
	}, CatalogPage );
});

//
// HasPopupDemo
//
HasPopupDemo = Control.subclass( "HasPopupDemo", function renderHasPopupDemo() {
	this.properties({
		"content": [
			" ",
			HasPopup.create({
				"content": " Click me for a popup  ",
				"openOnClick": "true",
				"closeOnInsideClick": "true",
				"popup": " And here's the popup! "
			}),
			" "
		]
	}, Control );
});

//
// HintTextBox
//
HintTextBox = Control.subclass( "HintTextBox", function renderHintTextBox() {
	this.properties({
		"content": [
			" ",
			this._define( "$HintTextBox_textBox", Control( "<input id=\"HintTextBox_textBox\" type=\"text\" />" ) ),
			" ",
			this._define( "$HintTextBox_hint", Control( "<div id=\"HintTextBox_hint\" />" ) ),
			" "
		]
	}, Control );
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
// HintTextBoxAbout
//
HintTextBoxAbout = CatalogPage.subclass( "HintTextBoxAbout", function renderHintTextBoxAbout() {
	this.properties({
		"title": "HintTextBox",
		"sourceFileExample": "HintTextBox/HintTextBoxDemo.qui",
		"sourceFileControl": "HintTextBox/HintTextBox.qui",
		"summary": " A text box that displays a hint (instructions) when the text box is empty. ",
		"demo": [
			" ",
			HintTextBoxDemo.create(),
			" "
		],
		"notes": " The standard approach to hint text is to display the hint as text in the text box itself, then remove it when the text box receives the focus. The problem is that there are occasions when the hint should still be visible after the control receives the focus. First, a user tabbing into a field may still want to have the hint visible until they begin typing. Second, there are times when it’s desirable to place the default focus for a page into a text box with a hint. Third, if the user erases what they have typed, it’s helpful to show the hint again. "
	}, CatalogPage );
});
HintTextBoxAbout.prototype.extend({
	initialize: function() {
		HintTextBoxAbout.superclass.prototype.initialize.call(this);
		this.find("input").focus();
	}
});

//
// HintTextBoxDemo
//
HintTextBoxDemo = Control.subclass( "HintTextBoxDemo", function renderHintTextBoxDemo() {
	this.properties({
		"content": [
			" ",
			Control( "<div />" ).content(
				" ",
				HintTextBox.create({
					"hint": "Type here"
				}),
				" "
			),
			" "
		]
	}, Control );
});

//
// HorizontalPanelsAbout
//
HorizontalPanelsAbout = CatalogPage.subclass( "HorizontalPanelsAbout", function renderHorizontalPanelsAbout() {
	this.properties({
		"title": "HorizontalPanels",
		"sourceFileExample": "HorizontalPanels/HorizontalPanelsDemo.qui",
		"sourceFileControl": "../quicommon/HorizontalPanels.qui",
		"summary": " Layout for a main content area with panels on the left and/or right <i>of an unknown size</i> (i.e., which size to their content), and where the main content area should take the remaining space. ",
		"demo": [
			" ",
			HorizontalPanelsDemo.create(),
			" "
		],
		"notes": " <p>\n            There are many strategies for laying out left/right side panels when the\n            width of the panel(s) is fixed, or (using tables) when the height of the\n            layout area does <i>not</i> need to be fixed. These constraints are often\n            problematic in user interfaces; e.g., when it is desirable to fix the\n            height of the layout area to the height of the viewport, and when the width\n            of the side panels is unknown. \n\t\t    </p> <p>\n\t\t    The HorizontalPanels control is similar to the horizontal uses of\n\t\t    the XAML (Silverlight) DockPanel control. The layout engine which\n\t\t    HorizontalPanels relies on uses JavaScript to recalculate the width\n\t\t    of the panels when the control is resized. \n\t\t    </p> "
	}, CatalogPage );
});

//
// HorizontalPanelsDemo
//
HorizontalPanelsDemo = Control.subclass( "HorizontalPanelsDemo", function renderHorizontalPanelsDemo() {
	this.properties({
		"content": [
			" ",
			HorizontalPanels.create({
				"content": "Main content",
				"left": "Left panel",
				"right": "Right panel"
			}),
			" "
		]
	}, Control );
});

//
// ListAbout
//
ListAbout = CatalogPage.subclass( "ListAbout", function renderListAbout() {
	this.properties({
		"title": "List",
		"sourceFileExample": "List/ListDemo.qui",
		"sourceFileControl": "../quicommon/List.qui",
		"summary": " Renders each element of a JavaScript array as a QuickUI control. ",
		"demo": [
			" ",
			ListDemo.create(),
			" "
		],
		"notes": " If the properties of the array elements map directly to control properties (as in the demo above), you can set the List's items property directly. Alternatively, you can define a mapping function that will be invoked once for each array element. "
	}, CatalogPage );
});

//
// ListComboBox
//
ListComboBox = ComboBox.subclass( "ListComboBox", function renderListComboBox() {
	this.properties({
		"popup": [
			" ",
			this._define( "$list", List.create({
				"id": "list"
			}) ),
			" "
		]
	}, ComboBox );
});
ListComboBox.prototype.extend({
    
    itemClass: Control.chain( "$list", "itemClass" ),
    items: Control.chain( "$list", "items" ),
    mapFunction: Control.chain( "$list", "mapFunction" ),
    
    initialize: function() {
        
        ListComboBox.superclass.prototype.initialize.call( this );
        this.genericIfClassIs( ListComboBox );
        
        // Clicking an item in the list puts its content into the text box portion.
        var self = this;
        this.$list().click( function( event ) {
            var $closestItem = $( event.target ).closest( self.$list().children() );
            if ( $closestItem ) {
                var itemContent = $closestItem.control().content();
                self
                    .content( itemContent )
                    .close();
            }
        });
    }
});

//
// ListDemo
//
ListDemo = Control.subclass( "ListDemo", function renderListDemo() {
	this.properties({
		"content": [
			" ",
			this._define( "$buttonList", List.create({
				"id": "buttonList",
				"itemClass": "SampleSpriteButton"
			}) ),
			" "
		]
	}, Control );
});
ListDemo.prototype.extend({
    initialize: function() {
        
        // Sample array.
        var data = [
            "One",
            "Two",
            "Three",
            "Four"
        ];
        
        // Render each member of the array as a list item.
        this.$buttonList().items(data);
        
        // Handle clicks on the buttons.
        this.click(function(event) {
            var button = $(event.target).closest(".SampleSpriteButton").control();
            if ( button ) {
                alert( button.content() );
            }
        });
    }
});

//
// LoremIpsum
//
LoremIpsum = Control.subclass( "LoremIpsum", function renderLoremIpsum() {
	this.properties({
		"content": " <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et adipiscing mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris vestibulum orci sed justo lobortis viverra. Suspendisse blandit dolor nunc, nec facilisis metus. Ut vestibulum ornare eros id vestibulum. Phasellus aliquam pellentesque urna, eu ullamcorper odio sollicitudin vel. Aliquam lacinia dolor at elit viverra ullamcorper. Vestibulum ac quam augue. Fusce tortor risus, commodo in molestie vitae, rutrum eu metus. Nunc tellus justo, consequat in ultrices elementum, gravida a mi. Praesent in lorem erat, quis dictum magna. Aenean et eros ligula, quis sodales justo. Quisque egestas imperdiet dignissim.\n</p> <p>\nAenean commodo nulla sit amet urna ornare quis dignissim libero tristique. Praesent non justo metus. Nam ut adipiscing enim. In hac habitasse platea dictumst. Nulla et enim sit amet leo laoreet lacinia ut molestie magna. Vestibulum bibendum venenatis eros sit amet eleifend. Fusce eget metus orci. Fusce tincidunt laoreet lacinia. Proin a arcu purus, nec semper quam. Mauris viverra vestibulum sagittis. Ut commodo, dolor malesuada aliquet lacinia, dui est congue massa, vel sagittis metus quam vel elit. Nulla vel condimentum odio. Aliquam cursus velit ut tellus ultrices rutrum.\n</p> <p>\nVivamus sollicitudin rhoncus purus, luctus lobortis dui viverra vitae. Nam mauris elit, aliquet at congue sed, volutpat feugiat eros. Nulla quis nulla ac lectus dapibus viverra. Pellentesque commodo mauris vitae sapien molestie sit amet pharetra quam pretium. Maecenas scelerisque rhoncus risus, in pharetra dui euismod ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut turpis sapien, sed molestie odio. Vivamus nec lectus nunc, vel ultricies felis. Mauris iaculis rhoncus dictum. Vivamus at mi tellus. Etiam nec dui eu risus placerat adipiscing non at nisl. Curabitur commodo nunc accumsan purus hendrerit mollis. Fusce lacinia urna nec eros consequat sed tempus mi rhoncus. Morbi eu tortor sit amet tortor elementum dapibus. Suspendisse tincidunt lorem quis urna sollicitudin lobortis. Nam eu ante ut tellus vulputate ultrices eu sed mi. Aliquam lobortis ultricies urna, in imperdiet lacus tempus a. Duis nec velit eros, ut volutpat neque. Sed quam purus, tempus vitae porta eget, porta sit amet eros.\n</p> <p>\nVestibulum dignissim ullamcorper est id molestie. Nunc erat ante, lobortis id dictum in, ultrices sit amet nisl. Nunc blandit pellentesque sapien, quis egestas risus auctor quis. Fusce quam quam, ultrices quis convallis sed, pulvinar auctor tellus. Etiam dolor velit, hendrerit et auctor sit amet, ornare nec erat. Nam tellus mi, rutrum a pretium et, dignissim sed sapien. Sed accumsan dapibus ipsum ut facilisis. Curabitur vel diam massa, ut ultrices est. Sed nec nunc arcu. Nullam lobortis, enim nec gravida molestie, orci risus blandit orci, et suscipit nunc odio eget nisl. Praesent lectus tellus, gravida ut sagittis non, convallis a leo. Mauris tempus feugiat fermentum. Phasellus nibh mi, convallis eu pulvinar eget, posuere in nunc. Morbi volutpat laoreet mauris vel porta. Aenean vel venenatis nisi. Ut tristique mauris sed libero malesuada quis rhoncus augue convallis.\n</p> <p>\nFusce pellentesque turpis arcu. Nunc bibendum, odio id faucibus malesuada, diam leo congue urna, sed sodales orci turpis id sem. Ut convallis fringilla dapibus. Ut quis orci magna. Mauris nec erat massa, vitae pellentesque tortor. Sed in ipsum nec enim feugiat aliquam et id arcu. Nunc ut massa sit amet nisl semper ultrices eu id lacus. Integer eleifend aliquam interdum. Cras a sapien sapien. Duis non orci lacus. Integer commodo pharetra nulla eget ultrices. Etiam congue, enim at vehicula posuere, urna lorem hendrerit erat, id condimentum quam lectus ac ipsum. Aliquam lorem purus, tempor ac mollis in, varius eget metus. Nam faucibus accumsan sapien vitae ultrices. Morbi justo velit, bibendum non porta vel, tristique quis odio. In id neque augue. Cras interdum felis sed dui ultricies laoreet sit amet eu elit. Vestibulum condimentum arcu in massa lobortis vitae blandit neque mattis. Nulla imperdiet luctus mollis.\n</p> <p>\nDonec eget lorem ipsum, eu posuere mi. Duis lorem est, iaculis sit amet molestie a, tincidunt rutrum magna. Integer facilisis suscipit tortor, id facilisis urna dictum et. Suspendisse potenti. Aenean et mollis arcu. Nullam at nulla risus, vitae fermentum nisl. Nunc faucibus porta volutpat. Sed pretium semper libero, vitae luctus erat lacinia vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer facilisis tempus tellus, rhoncus pretium orci semper sed. Morbi non lectus leo, quis semper diam. Suspendisse ac urna massa, vitae egestas metus. Pellentesque viverra mattis semper. Cras tristique bibendum leo, laoreet ultrices urna condimentum at. Praesent at tincidunt velit. Nam fringilla nibh quis nulla volutpat lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\n</p> <p>\nSed ultrices sollicitudin neque ut molestie. Sed at lectus in lacus scelerisque suscipit non id risus. Aliquam lorem nibh, convallis vitae molestie in, commodo feugiat nibh. Praesent bibendum arcu sit amet lacus posuere feugiat. Nullam nec lectus nisi. Aliquam porta, dui eu aliquam convallis, magna erat sodales ante, vitae dignissim velit quam in elit. Quisque vel lectus nunc. In dapibus bibendum fringilla. Praesent aliquet, leo sed lacinia euismod, mauris mauris fringilla arcu, in dignissim sem ligula in mauris. Integer tortor arcu, vulputate a hendrerit hendrerit, vulputate sit amet velit.\n</p> <p>\nNulla non ipsum nec risus pharetra fermentum et vel tellus. Nullam a aliquam arcu. In consectetur accumsan consequat. In hac habitasse platea dictumst. Donec in eros mi, vel tristique odio. Nulla ut nulla dolor. Nam feugiat facilisis nibh et condimentum. Vivamus sapien nibh, fringilla at tempus at, ornare at risus. Nulla facilisi. Donec rhoncus est quis purus eleifend volutpat. Nulla luctus tortor vel arcu faucibus nec dapibus nulla luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus vel ligula a metus sollicitudin imperdiet. Suspendisse elit leo, imperdiet bibendum imperdiet sed, consectetur vitae neque. Proin sit amet mattis augue. Suspendisse potenti. Suspendisse velit mauris, bibendum vel laoreet at, euismod non orci. Duis venenatis, turpis nec ullamcorper tincidunt, nunc leo porta ante, in ornare urna dolor ultrices tellus. Donec sem metus, pharetra faucibus consectetur ac, dictum eget sapien. Cras non lectus at leo fringilla viverra.\n</p> <p>\nInteger convallis congue semper. Ut sit amet sem ut dui tempor rutrum vitae eu libero. Aenean id dui vel lectus scelerisque elementum a a sapien. Proin fringilla auctor nulla posuere fringilla. Fusce vel turpis quam, non tempus leo. Quisque ac bibendum nulla. Vivamus faucibus adipiscing tellus, ut sagittis urna laoreet vel. Suspendisse adipiscing laoreet sodales. Etiam nec ipsum sed magna posuere laoreet a eu magna. Donec nec vulputate mi. Nam magna sem, ultrices quis ullamcorper ac, placerat eu enim. Praesent sagittis, risus nec tempus tincidunt, elit est feugiat libero, non tincidunt lectus sapien a lacus. Donec odio lectus, mattis sed ultrices eget, consectetur tempus tortor.\n</p> <p>\nNullam quam ipsum, ornare eu lacinia nec, scelerisque in mauris. Vestibulum rhoncus lobortis felis, tempor egestas enim gravida non. Duis nec nibh nunc. Maecenas interdum, quam sed dignissim vulputate, quam elit adipiscing nibh, mattis consectetur metus est ac nisi. Aenean rutrum viverra felis ut suscipit. Donec cursus, urna non ultricies ullamcorper, arcu leo sollicitudin tortor, sed congue orci libero eget dui. Nam pretium odio vitae enim tristique a accumsan purus consequat. Nulla ultricies consectetur enim a fringilla. Ut ut nisi elit, at condimentum ipsum. Nunc gravida scelerisque ante, nec vestibulum nulla euismod sit amet. Morbi mi est, varius nec rutrum eu, lacinia tempor tellus. Duis condimentum posuere eleifend. Sed fringilla massa a turpis consectetur ornare. Suspendisse molestie felis vitae turpis suscipit quis pharetra felis dictum. Praesent ipsum turpis, suscipit a porttitor eget, vulputate ut tellus. Duis sed consectetur arcu. In hac habitasse platea dictumst. Sed ipsum odio, rhoncus ut aliquam in, interdum et ante. \n</p> "
	}, Control );
});
LoremIpsum.prototype.extend({
    paragraphs: Control.property.integer(function(count) {
        this
            .find("p")
            .css("display", "block")
            .filter(":gt(" + (count - 1) + ")")
            .css("display", "none");
    })
});

//
// LoremIpsumAbout
//
LoremIpsumAbout = CatalogPage.subclass( "LoremIpsumAbout", function renderLoremIpsumAbout() {
	this.properties({
		"title": "LoremIpsum",
		"sourceFileExample": "LoremIpsum/LoremIpsumDemo.qui",
		"sourceFileControl": "LoremIpsum/LoremIpsum.qui",
		"summary": " Generates paragraphs of placeholder <a href=\"http://en.wikipedia.org/wiki/Lorem_ipsum\">lorem ipsum</a> text, useful for quickly filling in a user interface during design without drawing attention to content. ",
		"demo": [
			" ",
			LoremIpsumDemo.create(),
			" "
		]
	}, CatalogPage );
});

//
// LoremIpsumDemo
//
LoremIpsumDemo = Control.subclass( "LoremIpsumDemo", function renderLoremIpsumDemo() {
	this.properties({
		"content": [
			" ",
			LoremIpsum.create({
				"paragraphs": "2"
			}),
			" "
		]
	}, Control );
});

//
// MultiLineText
//
MultiLineText = Control.subclass( "MultiLineText" );
MultiLineText.prototype.extend({
    content: function(value) {
        if (value !== undefined)
        {
            var html = value.replace(/\n/g, '<br/>');
            return this.html(html);
        }
        else
        {
            var original = this.html()
                            .replace(/&lt;/g, "<")
                            .replace(/&gt;/g, ">")
                            .replace(/&amp;/g, "&")
                            .replace(/<br>/g, "\n")
                            .replace(/<br\/>/g, "\n");
            return original;
        }
    }
});

//
// MultiLineTextAbout
//
MultiLineTextAbout = CatalogPage.subclass( "MultiLineTextAbout", function renderMultiLineTextAbout() {
	this.properties({
		"title": "MultiLineText",
		"sourceFileExample": "MultiLineText/MultiLineTextDemo.qui",
		"sourceFileControl": "MultiLineText/MultiLineText.qui",
		"summary": " Displays text that may have line breaks and/or HTML entities. ",
		"demo": [
			" ",
			MultiLineTextDemo.create(),
			" "
		],
		"notes": [
			" This control is used by ",
			CatalogLink.create({
				"content": "AutoSizeTextBox"
			}),
			" to handle line breaks. "
		]
	}, CatalogPage );
});

//
// MultiLineTextDemo
//
MultiLineTextDemo = Control.subclass( "MultiLineTextDemo", function renderMultiLineTextDemo() {
	this.properties({
		"content": [
			" ",
			this._define( "$text", MultiLineText.create({
				"id": "text"
			}) ),
			" "
		]
	}, Control );
});
MultiLineTextDemo.prototype.extend({
    initialize: function() {
        this.$text().content(
            "This text\nhas JavaScript line breaks\nthat have been mapped\nto HTML line breaks."
        );
    }
});

//
// PageAbout
//
PageAbout = CatalogPage.subclass( "PageAbout", function renderPageAbout() {
	this.properties({
		"title": "Page",
		"sourceFileExample": "Page/PageDemo.qui",
		"sourceFileControl": "../quicommon/Page.qui",
		"summary": " Base class for creating top-level pages. The Page class offers some simple page-level facilities: getting/setting the page title (e.g., as an attribute in markup), cracking URL parameters, tracking changes via a hashchange event (using the jQuery hashchange plugin), and creating pages that fill the viewport. ",
		"demo": [
			" See ",
			CatalogLink.create({
				"content": "CatalogPage"
			}),
			" for a demo of a Page subclass. "
		]
	}, CatalogPage );
});

//
// HorizontalPanelsDemo
//
HorizontalPanelsDemo = Control.subclass( "HorizontalPanelsDemo", function renderHorizontalPanelsDemo() {
	this.properties({
		"content": [
			" ",
			HorizontalPanels.create({
				"content": "Main content",
				"left": "Left panel",
				"right": "Right panel"
			}),
			" "
		]
	}, Control );
});

//
// PopupAbout
//
PopupAbout = CatalogPage.subclass( "PopupAbout", function renderPopupAbout() {
	this.properties({
		"title": "Popup",
		"sourceFileControl": "../quicommon/Popup.qui",
		"summary": " Popup serves as a base class for popups, menus, dialogs — things that appear temporarily over other things. ",
		"demo": [
			" See ",
			CatalogLink.create({
				"content": "Dialog"
			}),
			" or ",
			CatalogLink.create({
				"content": "HasPopup"
			}),
			" for an example. "
		]
	}, CatalogPage );
});

//
// Repeater
//
Repeater = Control.subclass( "Repeater" );
Repeater.prototype.extend({

	itemClass: Control.property[ "class" ]( function() { this._refresh(); }),
	count: Control.property.integer( function() { this._refresh(); }, 0 ),
    expansion: Control.chain( "$Repeater_expansion", "content" ),
    
	initialize: function() {
		this._refresh();
	},

	_refresh: function() {
		var itemClass = this.itemClass();
		var count = this.count();
		var controls = [];
		if ( itemClass && count > 0 ) {
			for ( var i = 0; i < count; i++ ) {
				var $control = itemClass.create();
				controls.push( $control );
			}
		}
		this.content( controls );
	}
	
});

//
// SampleSpriteButtonAbout
//
SampleSpriteButtonAbout = CatalogPage.subclass( "SampleSpriteButtonAbout", function renderSampleSpriteButtonAbout() {
	this.properties({
		"title": "SampleSpriteButton",
		"sourceFileExample": "SampleSpriteButton/SampleSpriteButtonDemo.qui",
		"sourceFileControl": "SampleSpriteButton/SampleSpriteButton.qui",
		"summary": [
			" A sample of how to create a new ",
			CatalogLink.create({
				"content": "SpriteButton"
			}),
			" class through subclassing. The subclass simply defines a ",
			CatalogLink.create({
				"content": "Sprite"
			}),
			" (image strip) for the button’s various states. "
		],
		"demo": [
			" ",
			SampleSpriteButtonDemo.create(),
			" "
		]
	}, CatalogPage );
});

//
// SampleSpriteButtonDemo
//
SampleSpriteButtonDemo = Control.subclass( "SampleSpriteButtonDemo", function renderSampleSpriteButtonDemo() {
	this.properties({
		"content": [
			" ",
			SampleSpriteButton.create({
				"content": "Save"
			}),
			" ",
			SampleSpriteButton.create({
				"content": "Don't Save"
			}),
			" ",
			SampleSpriteButton.create({
				"content": "Cancel",
				"disabled": "true"
			}),
			" "
		]
	}, Control );
});
SampleSpriteButtonDemo.prototype.extend({
	initialize: function() {
		this.find(".SampleSpriteButton").click(function() {
			alert("You clicked \"" + $(this).control().content() + "\".");
		});
	}
});

//
// SearchBox
//
SearchBox = Control.subclass( "SearchBox", function renderSearchBox() {
	this.properties({
		"content": [
			" ",
			TextBoxWithButton.create({
				"textBox": [
					" ",
					this._define( "$searchTerms", HintTextBox.create({
						"id": "searchTerms",
						"hint": "Enter search"
					}) ),
					" "
				],
				"goButton": [
					" ",
					this._define( "$searchButton", SampleSpriteButton.create({
						"content": "Search",
						"id": "searchButton"
					}) ),
					" "
				]
			}),
			" "
		]
	}, Control );
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
// SearchBoxAbout
//
SearchBoxAbout = CatalogPage.subclass( "SearchBoxAbout", function renderSearchBoxAbout() {
	this.properties({
		"title": "SearchBox",
		"sourceFileExample": "SearchBox/GoogleSearchBox.qui",
		"sourceFileControl": "SearchBox/SearchBox.qui",
		"summary": [
			" A typical web search box, constructed from a ",
			CatalogLink.create({
				"content": "TextBoxWithButton"
			}),
			" hosting a ",
			CatalogLink.create({
				"content": "HintTextBox"
			}),
			" and ",
			CatalogLink.create({
				"content": "SampleSpriteButton"
			}),
			". "
		],
		"demo": [
			" ",
			GoogleSearchBox.create(),
			" "
		]
	}, CatalogPage );
});

//
// SlidingPages
//
SlidingPages = Control.subclass( "SlidingPages", function renderSlidingPages() {
	this.properties({
		"content": [
			" ",
			this._define( "$SlidingPages_content", Control( "<div id=\"SlidingPages_content\" />" ) ),
			" "
		]
	}, Control );
});
SlidingPages.prototype.extend({
    
    pages: Control.chain( "$SlidingPages_content", "children" ),
    
    initialize: function() {
        var self = this;
        this.insertedIntoDocument( function() {
            self._adjustWidths();
        });
        this.activeIndex(0);
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
    
    _adjustWidths: function() {
        var pages = this.pages();
        //pages.width( "auto" );
        var pageWidths = pages.map( function( index, child ) {
            return $( child ).outerWidth();
        }).get();
        var maxPageWidth = Math.max.apply( this, pageWidths );
        this.width( maxPageWidth );
    }
    
});

//
// SlidingPagesWithDots
//
SlidingPagesWithDots = Control.subclass( "SlidingPagesWithDots", function renderSlidingPagesWithDots() {
	this.properties({
		"content": [
			" ",
			this._define( "$pages", SlidingPages.create({
				"id": "pages"
			}) ),
			" ",
			this._define( "$pageButtons", Repeater.create({
				"id": "pageButtons"
			}) ),
			" "
		]
	}, Control );
});
SlidingPagesWithDots.prototype.extend({
    
    content: Control.chain( "$pages", "content" ),
    pageButtons: Control.chain( "$pageButtons", "children" ),
    pageButtonClass: Control.chain( "$pageButtons", "itemClass" ),
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
// SlidingPagesWithDotsDemo
//
SlidingPagesWithDotsDemo = Control.subclass( "SlidingPagesWithDotsDemo", function renderSlidingPagesWithDotsDemo() {
	this.properties({
		"content": [
			" ",
			SlidingPagesWithDots.create({
				"content": " <div class=\"page\">Bird</div> <div class=\"page\">Cat</div> <div class=\"page\">Dog</div> "
			}),
			" "
		]
	}, Control );
});

//
// SpriteAbout
//
SpriteAbout = CatalogPage.subclass( "SpriteAbout", function renderSpriteAbout() {
	this.properties({
		"title": "Sprite",
		"sourceFileExample": "Sprite/SpriteDemo.qui",
		"sourceFileControl": "../quicommon/Sprite.qui",
		"summary": " A very basic CSS sprite: shows a single image at a time from a strip of images. ",
		"demo": [
			" ",
			SpriteDemo.create(),
			" "
		]
	}, CatalogPage );
});

//
// SpriteButton
//
SpriteButton = ButtonBase.subclass( "SpriteButton", function renderSpriteButton() {
	this.properties({
		"content": [
			" ",
			this._define( "$backgroundLeft", Sprite.create({
				"id": "backgroundLeft"
			}) ),
			" ",
			this._define( "$backgroundRight", Sprite.create({
				"id": "backgroundRight"
			}) ),
			" ",
			this._define( "$SpriteButton_content", Control( "<button id=\"SpriteButton_content\" />" ) ),
			" "
		]
	}, ButtonBase );
});
SpriteButton.prototype.extend({
	
	content: Control.chain("$SpriteButton_content", "content"),
    image: Control.chain("$sprites", "image"),

	initialize: function() {
		SpriteButton.superclass.prototype.initialize.call(this);
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
		return SpriteButton.superclass.prototype.disabled.call(this, value);
	},
	
	$sprites: function() {
	    return this.children().filter(".Sprite").cast();
	},
	
	_renderButtonState: function(buttonState) {
		this.$sprites().currentCell(buttonState);
	}

});

//
// SpriteButtonAbout
//
SpriteButtonAbout = CatalogPage.subclass( "SpriteButtonAbout", function renderSpriteButtonAbout() {
	this.properties({
		"title": "SpriteButton",
		"sourceFileExample": "SampleSpriteButton/SampleSpriteButton.qui",
		"sourceFileControl": "SpriteButton/SpriteButton.qui",
		"summary": [
			" A button that uses a ",
			Link.create({
				"content": "Sprite",
				"href": "/gallery/default.html?page=SpriteAbout"
			}),
			" for its background. This subclasses ",
			CatalogLink.create({
				"content": "ButtonBase"
			}),
			" to obtain its mouse/pointer tracking behavior. "
		],
		"demo": [
			" See ",
			Link.create({
				"content": "SampleSpriteButton",
				"href": "/gallery/default.html?page=SampleSpriteButtonAbout"
			}),
			" for a demo. "
		]
	}, CatalogPage );
});

//
// SpriteDemo
//
SpriteDemo = Control.subclass( "SpriteDemo", function renderSpriteDemo() {
	this.properties({
		"content": [
			" ",
			this._define( "$sprite", Sprite.create({
				"id": "sprite",
				"image": "url(SampleSpriteButton/buttonStates.png)",
				"currentCell": "4",
				"cellHeight": "32"
			}) ),
			" ",
			"<p>\n\t\tSelect a frame from the sprite image:\n\t</p>",
			" ",
			this._define( "$image", Control( "<img id=\"image\" src=\"SampleSpriteButton/buttonStates.png\" />" ) ),
			" "
		]
	}, Control );
});
SpriteDemo.prototype.extend({
	initialize: function() {
		var self = this;
		this.$image().click(function(event) {
			var mouseY = event.pageY - $(this).offset().top;
			var cellIndex = Math.floor(mouseY / self.$sprite().cellHeight());
			self.$sprite().currentCell(cellIndex);
		});
	}
});

//
// Switch
//
Switch = Control.subclass( "Switch" );
Switch.prototype.extend({
	
	initialize: function() {
	    if ($(this.element).children().not(".hidden").length > 1)
	    {
            // Show first child by default. 
            this.activeIndex(0);
	    }
	},
    
    // The currently visible child.
    activeChild: function(activeChild) {
        if (activeChild === undefined)
        {
            return this.children().not(".hidden")[0];
        }
        else
        {
            /*
             * Apply a "hidden" style instead of just forcing display to none.
             * If we did that, we would have no good way to undo the hiding.
             * A simple .toggle(true) would set display: block, which wouldn't
             * be what we'd want for inline elements.
             */
            this.children().not(activeChild).toggleClass("hidden", true);
            $(activeChild).toggleClass("hidden", false);
        }
    },
    
    // The index of the currently visible child.
    activeIndex: function(index)
    {
        if (index === undefined)
        {
            return this.children().index(this.activeChild());
        }
        else
        {
            this.activeChild(this.children()[index]);
        }
    }
        
});

//
// SwitchAbout
//
SwitchAbout = CatalogPage.subclass( "SwitchAbout", function renderSwitchAbout() {
	this.properties({
		"title": "Switch",
		"sourceFileExample": "Switch/SwitchDemo.qui",
		"sourceFileControl": "Switch/Switch.qui",
		"summary": " Shows exactly one child. This can be useful, for example, if a given UI element has multiple modes that present substantially different elements. ",
		"demo": [
			" ",
			SwitchDemo.create(),
			" "
		]
	}, CatalogPage );
});

//
// SwitchDemo
//
SwitchDemo = Control.subclass( "SwitchDemo", function renderSwitchDemo() {
	this.properties({
		"content": [
			" ",
			this._define( "$switchMode", Switch.create({
				"content": [
					" ",
					this._define( "$textEditable", Control( "<input type=\"text\" id=\"textEditable\" value=\"Hello, world.\" />" ) ),
					" ",
					this._define( "$textReadOnly", Control( "<div id=\"textReadOnly\" />" ) ),
					" "
				],
				"id": "switchMode"
			}) ),
			" ",
			this._define( "$modeEdit", Control( "<input type=\"radio\" name=\"mode\" id=\"modeEdit\" checked=\"checked\" />" ) ),
			" ",
			"<label for=\"modeEdit\">Editable</label>",
			" ",
			this._define( "$modeRead", Control( "<input type=\"radio\" name=\"mode\" id=\"modeRead\" />" ) ),
			" ",
			"<label for=\"modeRead\">Read-only</label>",
			" "
		]
	}, Control );
});
SwitchDemo.prototype.extend({
	initialize: function() {
		var self = this;
		this.$modeEdit().click(function(event) {
		    self.$switchMode().activeIndex(0);
		});
        this.$modeRead().click(function(event) {
            self.$textReadOnly().content(self.$textEditable().content());
            self.$switchMode().activeIndex(1);
        });
	}
});

//
// TagAbout
//
TagAbout = CatalogPage.subclass( "TagAbout", function renderTagAbout() {
	this.properties({
		"title": "Tag",
		"sourceFileExample": "Tag/TagDemo.qui",
		"sourceFileControl": "../controls/Tag.qui",
		"summary": " The Tag control formats its content as an XML tag. The control is a simple example of what’s effectively a parameterized HTML macro that includes both content (opening and closing brackets) and styling (a fixed-width font). ",
		"demo": [
			" ",
			TagDemo.create(),
			" "
		],
		"notes": [
			" ",
			Control( "<p />" ).content(
				" The ",
				Tag.create({
					"content": "script"
				}),
				" defines the Tag control’s own contents to be as the contents of the ",
				Tag.create({
					"content": "span"
				}),
				" tag. "
			),
			" ",
			"<p>\n\t\t\tThe behavior of the Tag control is simple enough that it could be replicated purely\n\t\t\tin CSS 3 by making use of the “content” attribute. The content attribute allows one\n\t\t\tto specify text that should appear before and after a matching HTML element.\n\t\t\tThe QuickUI approach is more flexible in that it allows arbitrary elements to be\n\t\t\tplaced before and after the control’s content.\n\t\t\t</p>",
			" "
		]
	}, CatalogPage );
});

//
// TagDemo
//
TagDemo = Control.subclass( "TagDemo", function renderTagDemo() {
	this.properties({
		"content": [
			" Here's a reference to the ",
			Tag.create({
				"content": "script"
			}),
			" tag. "
		]
	}, Control );
});

//
// TestPage
//
TestPage = Control.subclass( "TestPage", function renderTestPage() {
	this.properties({
		"content": [
			" ",
			this._define( "$test", Control( "<div id=\"test\">Test</div>" ) ),
			" ",
			SampleSpriteButton.create({
				"content": "Hello"
			}),
			" "
		]
	}, Control );
});

//
// TextBoxWithButton
//
TextBoxWithButton = Control.subclass( "TextBoxWithButton", function renderTextBoxWithButton() {
	this.properties({
		"content": [
			" ",
			this._define( "$TextBoxWithButton_textBox", Control( "<div id=\"TextBoxWithButton_textBox\" />" ) ),
			" ",
			this._define( "$TextBoxWithButton_goButton", Control( "<div id=\"TextBoxWithButton_goButton\" />" ) ),
			" "
		]
	}, Control );
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
// TextBoxWithButtonAbout
//
TextBoxWithButtonAbout = CatalogPage.subclass( "TextBoxWithButtonAbout", function renderTextBoxWithButtonAbout() {
	this.properties({
		"title": "TextBoxWithButton",
		"sourceFileControl": "TextBoxWithButton/TextBoxWithButton.qui",
		"summary": " A control with a content area (usually some form of text box) and an associated \"Go\" button (labeled something like \"Search\"), where clicking the button does something with the content. ",
		"demo": [
			" See ",
			CatalogLink.create({
				"content": "SearchBox"
			}),
			" for a demo. "
		]
	}, CatalogPage );
});

//
// TextCondenser
//
TextCondenser = Layout.subclass( "TextCondenser", function renderTextCondenser() {
	this.properties({
		"content": [
			" ",
			this._define( "$normal", Control( "<span id=\"normal\" />" ) ),
			" ",
			this._define( "$condensed", Control( "<span id=\"condensed\" />" ) ),
			" "
		]
	}, Layout );
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
// TextCondenserAbout
//
TextCondenserAbout = CatalogPage.subclass( "TextCondenserAbout", function renderTextCondenserAbout() {
	this.properties({
		"title": "TextCondenser",
		"sourceFileExample": "TextCondenser/TextCondenserDemo.qui",
		"sourceFileControl": "TextCondenser/TextCondenser.qui",
		"summary": [
			" Switches to a condensed font when necessary to squeeze in more text. By using a condensed font from the same font family as the normal text, users generally won't even notice the font change, but will nevertheless benefit from seeing the additional characters. The demo below also makes use of a ",
			CatalogLink.create({
				"content": "Fader"
			}),
			" to fade out text, which even after being condensed, is too long to fit. "
		],
		"demo": [
			" ",
			TextCondenserDemo.create(),
			" "
		]
	}, CatalogPage );
});

//
// TextCondenserDemo
//
TextCondenserDemo = Control.subclass( "TextCondenserDemo", function renderTextCondenserDemo() {
	this.properties({
		"content": [
			" ",
			Fader.create({
				"content": [
					" ",
					TextCondenser.create({
						"content": "Austria"
					}),
					" ",
					TextCondenser.create({
						"content": "Bosnia and Herzegovina"
					}),
					" ",
					TextCondenser.create({
						"content": "Dominican Republic"
					}),
					" ",
					TextCondenser.create({
						"content": "Germany"
					}),
					" ",
					TextCondenser.create({
						"content": "Saint Vincent and the Grenadines"
					}),
					" ",
					TextCondenser.create({
						"content": "Trinidad and Tobago"
					}),
					" ",
					TextCondenser.create({
						"content": "United Republic of Tanzania"
					}),
					" ",
					TextCondenser.create({
						"content": "Viet Nam"
					}),
					" "
				]
			}),
			" "
		]
	}, Control );
});
TextCondenserDemo.prototype.extend({
    initialize: function() {
        this.find(".TextCondenser").control().condensedFontFamily("Open Sans Condensed");
    }
});

//
// VerticalPanelsAbout
//
VerticalPanelsAbout = CatalogPage.subclass( "VerticalPanelsAbout", function renderVerticalPanelsAbout() {
	this.properties({
		"title": "VerticalPanels",
		"sourceFileExample": "VerticalPanels/VerticalPanelsDemo.qui",
		"sourceFileControl": "../quicommon/VerticalPanels.qui",
		"summary": " Layout for a main content area with panels on the top and/or bottom <i>of an unknown size</i> (i.e., which size to their content), and where the main content area should take the remaining space. ",
		"demo": [
			" ",
			VerticalPanelsDemo.create(),
			" "
		],
		"notes": " <p>\n            There are many strategies for laying out top/bottom panels, but these\n            all have various constraints, e.g., requiring that the top/bottom panels\n            have a known, fixed height.\n\t\t    </p> <p>\n\t\t    The VerticalPanels control is similar to the vertical uses of\n\t\t    the XAML (Silverlight) DockPanel control. The layout engine which\n\t\t    VerticalPanels relies on uses JavaScript to recalculate the height\n\t\t    of the panels when the control is resized. \n\t\t    </p> "
	}, CatalogPage );
});

//
// VerticalPanelsDemo
//
VerticalPanelsDemo = Control.subclass( "VerticalPanelsDemo", function renderVerticalPanelsDemo() {
	this.properties({
		"content": [
			" ",
			VerticalPanels.create({
				"content": "Main content",
				"top": "Top panel",
				"bottom": "Bottom panel"
			}),
			" "
		]
	}, Control );
});

//
// AutoSizeTextBoxAbout
//
AutoSizeTextBoxAbout = CatalogPage.subclass( "AutoSizeTextBoxAbout", function renderAutoSizeTextBoxAbout() {
	this.properties({
		"title": "AutoSizeTextBox",
		"sourceFileExample": "AutoSizeTextBox/AutoSizeTextBoxDemo.qui",
		"sourceFileControl": "AutoSizeTextBox/AutoSizeTextBox.qui",
		"summary": " A text area that expands to contain its text. ",
		"demo": [
			" ",
			AutoSizeTextBoxDemo.create(),
			" "
		],
		"notes": [
			" This control uses ",
			CatalogLink.create({
				"content": "MultiLineText"
			}),
			" to map JavaScript line breaks to HTML line breaks, and vice versa. "
		]
	}, CatalogPage );
});

//
// BrowserSpecificAbout
//
BrowserSpecificAbout = CatalogPage.subclass( "BrowserSpecificAbout", function renderBrowserSpecificAbout() {
	this.properties({
		"title": "BrowserSpecific",
		"sourceFileExample": "BrowserSpecific/BrowserSpecificDemo.qui",
		"sourceFileControl": "../quicommon/BrowserSpecific.qui",
		"summary": [
			" Conditionally shows contents if the given browser is in use (defined by ",
			Link.create({
				"content": "jQuery.browser",
				"href": "http://docs.jquery.com/Utilities/jQuery.browser"
			}),
			"). "
		],
		"demo": [
			" ",
			BrowserSpecificDemo.create(),
			" "
		]
	}, CatalogPage );
});

//
// ButtonBaseAbout
//
ButtonBaseAbout = CatalogPage.subclass( "ButtonBaseAbout", function renderButtonBaseAbout() {
	this.properties({
		"title": "ButtonBase",
		"sourceFileExample": "ButtonBase/ButtonBaseDemo.qui",
		"sourceFileControl": "../quicommon/ButtonBase.qui",
		"summary": [
			" This is a useful base class for buttons, as it handles basic tracking of the mouse/pointer states and a disabled state. See ",
			CatalogLink.create({
				"content": "SpriteButton"
			}),
			" and ",
			CatalogLink.create({
				"content": "SampleSpriteButton"
			}),
			" for sample subclasses. "
		],
		"demo": [
			" ",
			ButtonBaseDemo.create(),
			" "
		]
	}, CatalogPage );
});

//
// SampleSpriteButton
//
SampleSpriteButton = SpriteButton.subclass( "SampleSpriteButton", function renderSampleSpriteButton() {
	this.properties({
		"image": "url(SampleSpriteButton/buttonStates.png)",
		"cellHeight": "32"
	}, SpriteButton );
});

