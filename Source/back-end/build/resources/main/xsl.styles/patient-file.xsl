<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:xls="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <fo:root>
            <fo:layout-master-set>
                <fo:simple-page-master master-name="simpleA4"
                                       page-height="29.7cm" page-width="21.0cm" margin="2cm">
                    <fo:region-body/>
                </fo:simple-page-master>
            </fo:layout-master-set>
            <fo:page-sequence master-reference="simpleA4">
                <fo:flow flow-name="xsl-region-body">
                    <fo:block border-width="1mm" border-style="solid" border-color="black" padding="10mm" text-align="center">
                        <fo:block font-family="Helvetica" color="red" font-size="22pt" font-weight="bold">
                            Patient: <xsl:value-of select="patient/patientInfo/firstName"/> <xsl:value-of select="patient/patientInfo/lastName"/>
                        </fo:block>
                        <fo:block font-family="Helvetica" font-size="16pt">
                            Contact Number: <xsl:value-of select="patient/patientInfo/contactNumber" />
                        </fo:block>
                    </fo:block>
                    <fo:block font-size="20pt" margin-top="10mm">
                        Food Diary
                    </fo:block>
                    <fo:block font-size="10pt">
                        <fo:table>
                            <fo:table-column column-width="40mm"/>
                            <fo:table-column column-width="70mm"/>
                            <fo:table-column column-width="30mm"/>
                            <fo:table-column column-width="30mm"/>
                            <fo:table-header>
                                <fo:table-row>
                                    <fo:table-cell><fo:block>Title</fo:block></fo:table-cell>
                                    <fo:table-cell><fo:block>Description</fo:block></fo:table-cell>
                                    <fo:table-cell><fo:block>Amount</fo:block></fo:table-cell>
                                    <fo:table-cell><fo:block>Date</fo:block></fo:table-cell>
                                </fo:table-row>
                            </fo:table-header>
                            <fo:table-body>
                                <xsl:for-each select="patient/foodDiary/foodItem">
                                    <fo:table-row>
                                        <fo:table-cell><fo:block><xls:value-of select="title"/></fo:block></fo:table-cell>
                                        <fo:table-cell><fo:block><xls:value-of select="description"/></fo:block></fo:table-cell>
                                        <fo:table-cell><fo:block><xls:value-of select="amount"/></fo:block></fo:table-cell>
                                        <fo:table-cell><fo:block><xls:value-of select="dateTime"/></fo:block></fo:table-cell>
                                    </fo:table-row>
                                </xsl:for-each>
                            </fo:table-body>
                        </fo:table>
                    </fo:block>
                    <fo:block font-size="20pt" margin-top="10mm">
                        Fluid Intake
                    </fo:block>
                    <fo:block>
                        <fo:table>
                            <fo:table-column column-width="50mm"/>
                            <fo:table-column column-width="50mm"/>
                            <fo:table-column column-width="50mm"/>
                            <fo:table-header>
                                <fo:table-row>
                                    <fo:table-cell><fo:block>Title</fo:block></fo:table-cell>
                                    <fo:table-cell><fo:block>Amount</fo:block></fo:table-cell>
                                    <fo:table-cell><fo:block>Date</fo:block></fo:table-cell>
                                </fo:table-row>
                            </fo:table-header>
                            <fo:table-body>
                                <xsl:for-each select="patient/fluidIntake/fluidItem">
                                    <fo:table-row>
                                        <fo:table-cell><fo:block><xls:value-of select="title"/></fo:block></fo:table-cell>
                                        <fo:table-cell><fo:block><xls:value-of select="amount"/></fo:block></fo:table-cell>
                                        <fo:table-cell><fo:block><xls:value-of select="dateTime"/></fo:block></fo:table-cell>
                                    </fo:table-row>
                                </xsl:for-each>
                            </fo:table-body>
                        </fo:table>
                    </fo:block>
                </fo:flow>
            </fo:page-sequence>
        </fo:root>
    </xsl:template>
</xsl:stylesheet>